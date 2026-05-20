import 'server-only'
import { Client, collectPaginatedAPI } from '@notionhq/client'
import type { LibraryItem, TmdbDetails } from '@/lib/types'

const NOTION_API_KEY = process.env.NOTION_API_KEY
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID
const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN
const TMDB_BASE = 'https://api.themoviedb.org/3'
const TMDB_POSTER_BASE = 'https://image.tmdb.org/t/p/w500'


const notion = new Client({ auth: NOTION_API_KEY })

/** https://www.themoviedb.org/movie/1084242-zootopia-2 -> { type: 'movie', id: 1084242 } */
function parseTmdbUrl(url: string): { type: 'tv' | 'movie', id: number } | null {
  const match = url.match(/themoviedb\.org\/(tv|movie)\/(\d+)/i)
  if (!match) return null
  const id = parseInt(match[2], 10)
  if (Number.isNaN(id)) return null
  return { type: match[1].toLowerCase() as 'tv' | 'movie', id }
}

async function getTmdbDetails(type: 'tv' | 'movie', id: number): Promise<TmdbDetails | null> {
  if (!TMDB_ACCESS_TOKEN) return null

  const res = await fetch(`${TMDB_BASE}/${type}/${id}?language=zh-TW`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
      accept: 'application/json',
    },
    next: { revalidate: 3600 },
  })

  if (!res.ok) return null

  const data = await res.json()

  return {
    title: type === 'tv' ? (data.name ?? '') : (data.title ?? ''),
    url: `https://www.themoviedb.org/${type}/${id}`,
    posterUrl: data.poster_path ? `${TMDB_POSTER_BASE}${data.poster_path}` : null,
    releaseDate: type === 'tv' ? (data.first_air_date ?? '') : (data.release_date ?? ''),
  }
}

// ── MangaDex ───────────────────────────────────────────────────────────────

const MANGADEX_API = 'https://api.mangadex.org'
const MANGADEX_COVER = 'https://uploads.mangadex.org/covers'

interface MangaDexDetails {
  /** 映射到 LibraryItem 的 title */
  title: string
  /** 映射到 LibraryItem 的 externalUrl */
  url: string
  /** 映射到 LibraryItem 的 imageUrl */
  coverUrl: string | null
  /** 映射到 LibraryItem 的 releaseDate */
  startDate: string
}

/** https://mangadex.org/title/801513ba-a712-498c-8f57-cae55b38cc92/berserk -> '801513ba-...' */
function parseMangaDexUrl(url: string): string | null {
  const match = url.match(/mangadex\.org\/title\/([0-9a-f-]{36})/i)
  return match ? match[1] : null
}

function pickMangaDexTitle(
  title: Record<string, string>,
  altTitles: Record<string, string>[],
): string {
  const merged: Record<string, string> = Object.assign({}, title, ...altTitles)
  return merged['zh-hk'] ?? merged['zh'] ?? merged['en'] ?? Object.values(merged)[0] ?? ''
}

async function getMangaDexDetails(id: string): Promise<MangaDexDetails | null> {
  const res = await fetch(`${MANGADEX_API}/manga/${id}?includes[]=cover_art`, {
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    console.error('[MangaDex] Request failed:', res.status)
    return null
  }

  const json = await res.json()
  const data = json.data
  if (!data) return null

  const attrs = data.attributes
  const coverRel = (data.relationships as Array<{ type: string, attributes?: { fileName?: string } }>)
    .find((r) => r.type === 'cover_art')
  const coverUrl = coverRel?.attributes?.fileName
    ? `${MANGADEX_COVER}/${id}/${coverRel.attributes.fileName}.256.jpg`
    : null

  return {
    title: pickMangaDexTitle(attrs.title ?? {}, attrs.altTitles ?? []),
    url: `https://mangadex.org/title/${id}`,
    coverUrl,
    startDate: attrs.year ? `${attrs.year}-01-01` : '',
  }
}

// ── Notion ─────────────────────────────────────────────────────────────────

export async function fetchAllLibraryItems(): Promise<LibraryItem[]> {
  if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
    console.warn('[Notion] Missing API key or database ID')
    return []
  }

  try {
    const allResults = await collectPaginatedAPI(notion.dataSources.query, {
      data_source_id: NOTION_DATABASE_ID,
      page_size: 100,
    })

    const items = await Promise.all(
      allResults.map(async (page) => {
        const props = (page as { id: string, properties?: Record<string, unknown> }).properties ?? {}
        const titleProp = props.title as { title?: Array<{ plain_text?: string }> } | undefined
        const typeProp = props.type as { select?: { name?: string } } | undefined
        const ratingProp = props.rating as { number?: number } | undefined
        const urlProp = props.url as { url?: string } | undefined

        const title = titleProp?.title?.[0]?.plain_text ?? 'Untitled'
        const itemType = typeProp?.select?.name ?? ''
        const rating = ratingProp?.number ?? 0
        const urlRaw = urlProp?.url ?? ''

        const workData: LibraryItem = {
          id: page.id,
          title,
          type: itemType,
          rating,
          imageUrl: null,
          releaseDate: '',
          externalUrl: null,
        }

        if (urlRaw) {
          if (itemType === 'tv' || itemType === 'movie') {
            const parsed = parseTmdbUrl(urlRaw)
            if (parsed) {
              const tmdb = await getTmdbDetails(parsed.type, parsed.id)
              workData.title = tmdb?.title ?? workData.title
              workData.imageUrl = tmdb?.posterUrl ?? null
              workData.releaseDate = tmdb?.releaseDate ?? ''
              workData.externalUrl = tmdb?.url ?? null
            }
          } else if (itemType === 'book') {
            const mangaId = parseMangaDexUrl(urlRaw)
            if (mangaId) {
              const manga = await getMangaDexDetails(mangaId)
              workData.title = manga?.title ?? workData.title
              workData.imageUrl = manga?.coverUrl ?? null
              workData.releaseDate = manga?.startDate ?? ''
              workData.externalUrl = manga?.url ?? null
            }
          }
        }

        return workData
      }),
    )

    return items
  } catch (error) {
    console.error('[Notion] Failed to fetch library items:', error)
    return []
  }
}

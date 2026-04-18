'use server'

import { Client, collectPaginatedAPI } from '@notionhq/client'
import { unstable_cache } from 'next/cache'
import type { LibraryItem, TmdbDetails } from '@/lib/types'

const NOTION_API_KEY = process.env.NOTION_API_KEY
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID
const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN
const TMDB_BASE = 'https://api.themoviedb.org/3'
const TMDB_POSTER_BASE = 'https://image.tmdb.org/t/p/w500'

const notion = new Client({ auth: NOTION_API_KEY })

/** https://www.themoviedb.org/movie/1084242-zootopia-2 -> { type: 'movie', id: 1084242 } */
function parseTmdbUrl(url: string): { type: 'tv' | 'movie'; id: number } | null {
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

async function fetchAllLibraryItems(): Promise<LibraryItem[]> {
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
        const props = (page as { id: string; properties?: Record<string, unknown> }).properties ?? {}
        const titleProp = props.title as { title?: Array<{ plain_text?: string }> } | undefined
        const typeProp = props.type as { select?: { name?: string } } | undefined
        const ratingProp = props.rating as { number?: number } | undefined
        const tmdbUrlProp = props.tmdb_url as { url?: string } | undefined

        const title = titleProp?.title?.[0]?.plain_text ?? 'Untitled'
        const itemType = typeProp?.select?.name ?? ''
        const rating = ratingProp?.number ?? 0
        const tmdbUrlRaw = tmdbUrlProp?.url ?? ''

        const workData: LibraryItem = {
          id: page.id,
          title,
          type: itemType,
          rating,
          imageUrl: null,
          releaseDate: '',
          externalUrl: null,
        }

        if (tmdbUrlRaw) {
          const parsedTmdbDetail = parseTmdbUrl(tmdbUrlRaw)
          if (parsedTmdbDetail) {
            const tmdb = await getTmdbDetails(parsedTmdbDetail.type, parsedTmdbDetail.id)
            workData.title = tmdb?.title ?? workData.title
            workData.imageUrl = tmdb?.posterUrl ?? null
            workData.releaseDate = tmdb?.releaseDate ?? ''
            workData.externalUrl = tmdb?.url ?? null
          }
        }

        return workData
      })
    )

    return items
  } catch (error) {
    console.error('[Notion] Failed to fetch library items:', error)
    return []
  }
}

// Cache the full item list for 1 hour so all paginated API calls share one Notion fetch
export const getLibraryItems = unstable_cache(fetchAllLibraryItems, ['library-items'], {
  revalidate: 3600,
})

const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN
const TMDB_ACCOUNT_ID = process.env.TMDB_ACCOUNT_ID
const TMDB_BASE = 'https://api.themoviedb.org/3'
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500'

const PAGE_SIZE = 20

export type RatedMovie = {
  id: number
  title: string
  rating: number
  poster_path: string | null
  release_date: string
}

export type RatedMoviesResponse = {
  page: number
  results: RatedMovie[]
  total_pages: number
  total_results: number
}

export type GetRatedMoviesParams = {
  page?: string
  language?: string
  /** created_at.* = API 依評分時間排序；rating.* = 先取全部再依評分排序後分頁 */
  sort?: 'created_at.asc' | 'created_at.desc' | 'rating.asc' | 'rating.desc'
}

function pickMovieFields(m: { id: number; title: string; rating: number; poster_path: string | null; release_date: string }): RatedMovie {
  return {
    id: m.id,
    title: m.title,
    rating: m.rating,
    poster_path: m.poster_path ?? null,
    release_date: m.release_date ?? '',
  }
}

export function getTmdbPosterUrl(path: string | null): string | null {
  if (!path) return null
  return `${TMDB_IMAGE_BASE}${path}`
}

async function fetchRatedMoviesPage(params: {
  page: number
  language: string
  sortBy: string
}): Promise<{ results: unknown[]; total_pages: number; total_results: number } | null> {
  const url = new URL(`${TMDB_BASE}/account/${TMDB_ACCOUNT_ID}/rated/movies`)
  url.searchParams.set('language', params.language)
  url.searchParams.set('page', String(params.page))
  url.searchParams.set('sort_by', params.sortBy)

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
      accept: 'application/json',
    },
    next: { revalidate: 3600 },
  })

  if (!res.ok) return null
  return res.json()
}

export async function getRatedMovies(params: GetRatedMoviesParams = {}): Promise<RatedMoviesResponse | null> {
  if (!TMDB_ACCESS_TOKEN || !TMDB_ACCOUNT_ID) return null

  const page = Math.max(1, parseInt(params.page ?? '1', 10) || 1)
  const language = params.language ?? 'zh-TW'
  const sort = params.sort ?? 'created_at.asc'

  const isSortByRating = sort === 'rating.asc' || sort === 'rating.desc'

  if (isSortByRating) {
    const all: RatedMovie[] = []
    let currentPage = 1
    let totalPages = 1

    do {
      const data = await fetchRatedMoviesPage({
        page: currentPage,
        language,
        sortBy: 'created_at.asc',
      })
      if (!data) return null
      totalPages = data.total_pages
      const items = (data.results as Array<{ id: number; title: string; rating: number; poster_path: string | null; release_date: string }>).map(
        pickMovieFields
      )
      all.push(...items)
      currentPage += 1
    } while (currentPage <= totalPages)

    all.sort((a, b) => (sort === 'rating.desc' ? b.rating - a.rating : a.rating - b.rating))

    const totalResults = all.length
    const totalPagesComputed = Math.ceil(totalResults / PAGE_SIZE) || 1
    const start = (page - 1) * PAGE_SIZE
    const results = all.slice(start, start + PAGE_SIZE)

    return {
      page,
      results,
      total_pages: totalPagesComputed,
      total_results: totalResults,
    }
  }

  const sortBy = sort === 'created_at.desc' ? 'created_at.desc' : 'created_at.asc'
  const data = await fetchRatedMoviesPage({ page, language, sortBy })
  if (!data) return null

  const results = (data.results as Array<{ id: number; title: string; rating: number; poster_path: string | null; release_date: string }>).map(
    pickMovieFields
  )

  return {
    page,
    results,
    total_pages: data.total_pages,
    total_results: data.total_results,
  }
}

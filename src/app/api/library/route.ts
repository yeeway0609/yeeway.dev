import { getLibraryItems } from '@/app/api/library/library.server'

const REVALIDATE_SECONDS = 3600
const STALE_WHILE_REVALIDATE_SECONDS = 86400

export const revalidate = REVALIDATE_SECONDS

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') ?? 'tv'
    const ratingParam = searchParams.get('rating')
    const rating = ratingParam ? Number(ratingParam) : undefined

    const allItems = await getLibraryItems()

    const items = allItems
      .filter((item) => {
        const matchesType = item.type.toLowerCase() === type.toLowerCase()
        const matchesRating = rating === undefined || item.rating === rating
        return matchesType && matchesRating
      })
      .sort((a, b) => Number(new Date(b.releaseDate)) - Number(new Date(a.releaseDate)))

    return Response.json(
      { items },
      {
        headers: {
          'Cache-Control': `public, s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=${STALE_WHILE_REVALIDATE_SECONDS}`,
        },
      }
    )
  } catch (error) {
    console.error('[API] Failed to fetch library data:', error)
    return Response.json({ error: 'Failed to fetch library data' }, { status: 500 })
  }
}

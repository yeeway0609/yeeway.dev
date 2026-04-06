import { getLibraryItems } from '@/app/api/library/library.server'

export const revalidate = 3600

export async function GET() {
  try {
    const works = await getLibraryItems()
    return Response.json(works, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error('[API] Failed to fetch library data:', error)
    return Response.json({ error: 'Failed to fetch library data' }, { status: 500 })
  }
}

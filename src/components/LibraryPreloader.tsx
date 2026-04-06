import { unstable_cache } from 'next/cache'

const getCachedLibraryData = unstable_cache(
  async (appUrl: string) => {
    try {
      const res = await fetch(`${appUrl}/api/library`, {
        next: { revalidate: 3600 },
      })
      if (!res.ok) {
        console.warn('[LibraryPreloader] API returned non-ok status:', res.status)
        return null
      }
      await res.json()
      return true
    } catch (error) {
      console.warn('[LibraryPreloader] Failed to preload library data:', error)
      return null
    }
  },
  ['library-preload'],
  { revalidate: 3600 }
)

export async function LibraryPreloader() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  await getCachedLibraryData(appUrl)
  return null
}

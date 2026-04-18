import { getLibraryItems } from '@/app/api/library/library.server'

export async function LibraryPreloader() {
  try {
    await getLibraryItems()
  } catch (error) {
    console.warn('[LibraryPreloader] Failed to preload library data:', error)
  }
  return null
}

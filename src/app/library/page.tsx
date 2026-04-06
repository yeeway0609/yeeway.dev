import type { Metadata } from 'next'
import Image from 'next/image'
import { LibraryTabs } from '@/app/library/LibraryTabs'
import { Badge } from '@/components/ui/badge'
import { LIBRARY_TYPES } from '@/lib/constants'
import type { LibraryItem } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Library',
}

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export default async function LibraryPage({ searchParams }: { searchParams: Promise<{ type?: string; rating?: string }> }) {
  const params = await searchParams
  const requestedType = params.type?.toLowerCase() ?? 'tv'
  const validTypes = LIBRARY_TYPES.map((t) => t.value)
  const currentType = validTypes.includes(requestedType as any) ? requestedType : 'tv'

  const url = new URL(`${BASE_URL}/api/library`)
  url.searchParams.set('type', currentType)
  if (params.rating && Number(params.rating) >= 1 && Number(params.rating) <= 6) {
    url.searchParams.set('rating', params.rating)
  }

  const res = await fetch(url.toString(), {
    next: { revalidate: 3600 },
  })

  const works: LibraryItem[] = await res.json()

  return (
    <main className="layout-container pb-20">
      <h1 className="page-title">Library</h1>
      <p className="page-sub-title">A collection of things</p>

      <LibraryTabs currentType={currentType} currentRating={params.rating} />

      <ul className="mt-4 grid grid-cols-3 gap-4 md:grid-cols-5 md:gap-6">
        {works.length === 0 ? (
          <div className="col-span-full flex items-center justify-center py-12 text-center">
            <p className="text-muted-foreground text-lg">No items</p>
          </div>
        ) : (
          works
            .sort((a, b) => Number(new Date(b.releaseDate)) - Number(new Date(a.releaseDate)))
            .map((work) => (
              <li key={work.id}>
                <a
                  className="bg-muted relative grid aspect-[2/3] place-items-center overflow-hidden rounded-lg border p-2 shadow-sm transition-transform hover:scale-[1.05]"
                  href={work.externalUrl ?? undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {work.imageUrl && <Image src={work.imageUrl} alt={work.title} fill className="object-cover" />}
                  <span>{work.title}</span>
                  <Badge className="absolute top-2 right-2 text-sm" variant="secondary">
                    {work.rating > 5 ? '🌟' : `${work.rating} ⭐️`}
                  </Badge>
                </a>
              </li>
            ))
        )}
      </ul>
    </main>
  )
}

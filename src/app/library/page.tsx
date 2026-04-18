import { Icon } from '@iconify/react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { LibraryToolbar } from '@/app/library/LibraryToolbar'
import { Badge } from '@/components/ui/badge'
import { LIBRARY_TYPES, RATING_OPTIONS } from '@/lib/constants'
import { getLibraryItems } from '@/lib/library.server'

type LibrarySearchParams = {
  type?: string
  rating?: string
  title?: string
}

interface LibraryPageProps {
  searchParams: Promise<LibrarySearchParams>
}

export const metadata: Metadata = {
  title: 'Library',
}

export default async function LibraryPage({ searchParams }: LibraryPageProps) {
  const { type: typeParam, rating: ratingParam, title: titleParam } = await searchParams

  const typeNormalized = typeParam?.toLowerCase() ?? 'tv'
  const validTypes = LIBRARY_TYPES.map((t) => t.value)
  const currentType = validTypes.includes(typeNormalized as (typeof validTypes)[number])
    ? typeNormalized
    : 'tv'

  const ratingFilter
    = ratingParam && Number(ratingParam) >= 1 && Number(ratingParam) <= 6
      ? Number(ratingParam)
      : undefined

  const titleSearch = titleParam?.trim().toLowerCase() ?? ''

  const allItems = await getLibraryItems()
  const items = allItems
    .filter((item) => {
      const matchesType = item.type.toLowerCase() === currentType.toLowerCase()
      const matchesRating = ratingFilter === undefined || item.rating === ratingFilter
      const matchesTitle = !titleSearch || item.title.toLowerCase().includes(titleSearch)
      return matchesType && matchesRating && matchesTitle
    })
    .sort((a, b) => Number(new Date(b.releaseDate)) - Number(new Date(a.releaseDate)))

  return (
    <main className="layout-container pb-20">
      <h1 className="page-title">Library</h1>
      <p className="page-sub-title">A collection of things I&apos;ve watched, read, or played.</p>

      <LibraryToolbar
        selectedType={currentType}
        ratingParam={ratingParam}
        titleParam={titleParam ?? ''}
      />

      {items.length === 0 ? (
        <div className="flex items-center justify-center py-12 text-center">
          <p className="text-lg text-muted-foreground">No items</p>
        </div>
      ) : (
        <ul className="mt-6 grid grid-cols-3 gap-4 md:grid-cols-6 md:gap-6">
          {items.map((work) => (
            <li key={work.id}>
              <a
                className="group relative grid aspect-2/3 place-items-center overflow-clip rounded-lg border bg-muted p-2 shadow-sm"
                href={work.externalUrl ?? undefined}
                target="_blank"
              >
                {work.imageUrl && <Image src={work.imageUrl} alt={work.title} fill className="object-cover" />}
                <span>{work.title}</span>

                <Badge
                  className="absolute top-2 left-2 text-sm"
                  variant="secondary"
                >
                  {RATING_OPTIONS.find((option) => option.value === String(work.rating))?.label ?? work.rating}
                </Badge>

                {work.releaseDate && (
                  <Badge
                    className="absolute right-2 bottom-2 text-xs opacity-0 transition-opacity group-hover:opacity-100"
                    variant="secondary"
                  >
                    {work.releaseDate}
                    <Icon className="ml-1 size-3" icon="mingcute:arrow-right-up-fill" />
                  </Badge>
                )}
              </a>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

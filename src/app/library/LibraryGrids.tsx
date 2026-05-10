'use client'

import { use, useMemo } from 'react'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { LIBRARY_TYPE_VALUES, RATING_OPTIONS } from '@/lib/constants'
import type { LibraryItem } from '@/lib/types'

const LIBRARY_JSON_URL = 'https://assets.yeeway.dev/library.json'

const itemsPromise = fetch(LIBRARY_JSON_URL).then((res) => {
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json() as Promise<LibraryItem[]>
})

export function LibraryGrids() {
  const items = use(itemsPromise)
  const searchParams = useSearchParams()
  const typeParam = searchParams.get('type')?.toLowerCase() ?? 'tv'
  const ratingParam = searchParams.get('rating') ?? undefined
  const titleParam = searchParams.get('title') ?? ''

  const currentType = LIBRARY_TYPE_VALUES.includes(typeParam as (typeof LIBRARY_TYPE_VALUES)[number])
    ? typeParam
    : 'tv'

  const ratingFilter = ratingParam && Number(ratingParam) >= 1 && Number(ratingParam) <= 6
    ? Number(ratingParam)
    : undefined

  const filteredItems = useMemo(() => items
    .filter((item) => {
      const matchesType = item.type.toLowerCase() === currentType.toLowerCase()
      const matchesRating = ratingFilter === undefined || item.rating === ratingFilter
      const matchesTitle = !titleParam || item.title.toLowerCase().includes(titleParam.toLowerCase())
      return matchesType && matchesRating && matchesTitle
    })
    .sort((a, b) => (
      Number(new Date(b.releaseDate)) - Number(new Date(a.releaseDate))
    )),
  [items, currentType, ratingFilter, titleParam],
  )

  if (filteredItems.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-center">
        <p className="text-lg text-muted-foreground">No items</p>
      </div>
    )
  }

  return (
    <ul className="mt-6 grid grid-cols-3 gap-4 md:grid-cols-6 md:gap-6">
      {filteredItems.map((work) => (
        <li key={work.id}>
          <a
            className="group relative grid aspect-2/3 place-items-center overflow-clip rounded-lg border bg-muted p-2 shadow-sm"
            href={work.externalUrl ?? undefined}
            target="_blank"
          >
            {work.imageUrl && (
              <Image
                className="size-full object-cover"
                src={work.imageUrl}
                alt={work.title}
                width={120}
                height={180}
                fetchPriority="low"
              />
            )}
            <span>{work.title}</span>

            <Badge
              className="absolute top-1 left-1 px-1.5 text-xs sm:top-2 sm:left-2"
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
  )
}

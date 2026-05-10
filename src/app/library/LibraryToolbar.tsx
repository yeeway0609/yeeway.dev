'use client'

import { type ChangeEvent, startTransition, useEffect, useState } from 'react'
import { useDebounce } from '@reactuses/core'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LIBRARY_TYPE_VALUES, LIBRARY_TYPE_OPTIONS, RATING_OPTIONS } from '@/lib/constants'

export function LibraryToolbar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const typeParam = searchParams.get('type')?.toLowerCase() ?? 'tv'
  const ratingParam = searchParams.get('rating') ?? undefined
  const titleParam = searchParams.get('title') ?? ''

  const selectedType = LIBRARY_TYPE_VALUES.includes(typeParam as (typeof LIBRARY_TYPE_VALUES)[number])
    ? typeParam
    : 'tv'

  const [titleInput, setTitleInput] = useState<string>(titleParam)
  const debouncedTitle = useDebounce(titleInput, 300)

  function handleTypeChange(value: string) {
    const params = new URLSearchParams(searchParams)
    params.set('type', value)
    params.delete('rating')
    startTransition(() => {
      router.push(`/library?${params.toString()}`, { scroll: false })
    })
  }

  function handleRatingChange(value: string) {
    const params = new URLSearchParams(searchParams)
    if (value === 'all') {
      params.delete('rating')
    } else {
      params.set('rating', value)
    }
    startTransition(() => {
      router.push(`/library?${params.toString()}`, { scroll: false })
    })
  }

  useEffect(() => {
    setTitleInput(titleParam)
  }, [titleParam])

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    if (debouncedTitle.trim()) {
      params.set('title', debouncedTitle.trim())
    } else {
      params.delete('title')
    }
    startTransition(() => {
      router.replace(`/library?${params.toString()}`, { scroll: false })
    })
  }, [debouncedTitle, router, searchParams])

  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-4">
        <Tabs value={selectedType} onValueChange={handleTypeChange}>
          <TabsList>
            {LIBRARY_TYPE_OPTIONS.map((type) => (
              <TabsTrigger key={type.value} value={type.value}>
                {type.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <Select value={ratingParam ?? 'all'} onValueChange={handleRatingChange}>
          <SelectTrigger className="w-30 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              不限評分
            </SelectItem>
            {RATING_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Input
        className="max-w-60"
        type="search"
        placeholder="Search by title..."
        value={titleInput}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleInput(e.target.value)}
      />
    </div>
  )
}

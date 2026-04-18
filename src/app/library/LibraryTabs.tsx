'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LIBRARY_TYPES, RATING_OPTIONS } from '@/lib/constants'

interface LibraryTabsProps {
  currentType: string
  currentRating?: string
}

export function LibraryTabs({ currentType, currentRating }: LibraryTabsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleTypeChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('type', value)
    params.delete('rating')
    router.push(`/library?${params.toString()}`, { scroll: false })
  }

  const handleRatingChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value === 'all') {
      params.delete('rating')
    } else {
      params.set('rating', value)
    }
    router.push(`/library?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex items-center gap-4">
      <Tabs value={currentType} onValueChange={handleTypeChange}>
        <TabsList>
          {LIBRARY_TYPES.map((type) => (
            <TabsTrigger key={type.value} value={type.value}>
              {type.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <Select value={currentRating ?? 'all'} onValueChange={handleRatingChange}>
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
  )
}

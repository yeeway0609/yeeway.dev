'use client'

import { useRouter } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LIBRARY_TYPES } from '@/lib/constants'

interface LibraryTabsProps {
  currentType: string
}

export function LibraryTabs({ currentType }: LibraryTabsProps) {
  const router = useRouter()

  const handleTabChange = (value: string) => {
    router.push(`/library?type=${value}`, { scroll: false })
  }

  return (
    <Tabs value={currentType} onValueChange={handleTabChange}>
      <TabsList>
        {LIBRARY_TYPES.map((type) => (
          <TabsTrigger key={type.value} value={type.value}>
            {type.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

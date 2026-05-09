import { Suspense } from 'react'
import type { Metadata } from 'next'
import { LibraryGrids } from '@/app/library/LibraryGrids'
import { LibraryToolbar } from '@/app/library/LibraryToolbar'

export const metadata: Metadata = {
  title: '收藏清單',
}

export default function LibraryPage() {
  return (
    <main className="layout-container pb-20">
      <h1 className="page-title">收藏清單</h1>
      <p className="page-sub-title">評價我看過的各種影視作品（好的壞的都有）</p>

      <LibraryToolbar />
      <Suspense fallback={<GridSkeleton />}>
        <LibraryGrids />
      </Suspense>
    </main>
  )
}

function GridSkeleton() {
  return (
    <ul className="mt-6 grid grid-cols-3 gap-4 md:grid-cols-6 md:gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <li key={i} className="aspect-2/3 animate-pulse rounded-lg bg-muted" />
      ))}
    </ul>
  )
}

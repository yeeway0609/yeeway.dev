import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '愛用工具',
}

export default async function Page() {
  const { default: UsesContent } = await import('@content/uses.mdx')

  return (
    <main className="layout-container pb-20">
      <h1 className="page-title">愛用工具</h1>
      <p className="page-sub-title">收藏了我最常用的工具、軟體或各種設備</p>

      <div className="-mt-6">
        <UsesContent />
      </div>
    </main>
  )
}

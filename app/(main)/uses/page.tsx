import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Uses',
}

export default async function Page() {
  const { default: UsesContent } = await import(`@/content/uses.mdx`)

  return (
    <main className="layout-container pb-20">
      <h1 className="page-title">Uses</h1>
      <p className="page-sub-title">A collection of my favorite tools, software, and gears.</p>

      <div className="-mt-6">
        <UsesContent />
      </div>
    </main>
  )
}

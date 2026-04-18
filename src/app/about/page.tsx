import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: '關於我',
}

export default async function Page() {
  const { default: AboutContent } = await import('@content/about.mdx')

  return (
    <main className="layout-container min-h-[calc(100vh-var(--spacing-header))] pb-20">
      <h1 className="page-title">關於我</h1>
      <Image className="mt-6 rounded-full" src="/assets/alex-avatar.jpeg" alt="Alex Su" width={120} height={120} />

      <AboutContent />
    </main>
  )
}

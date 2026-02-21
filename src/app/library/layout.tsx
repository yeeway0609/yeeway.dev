import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Library',
}

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="layout-container pb-20">
      <h1 className="page-title">Library</h1>
      <p className="page-sub-title">A collection of things</p>

      {children}
    </main>
  )
}

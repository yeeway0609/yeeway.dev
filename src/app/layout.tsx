import { GoogleAnalytics } from '@next/third-parties/google'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { ConsoleAsciiArt } from '@/components/ConsoleAsciiArt'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Providers } from '@/components/Providers'
import { SITE } from '@/lib/constants'
import './global.css'
import '@fontsource/commit-mono'

const nunito = Nunito({ subsets: ['latin'], weight: ['400', '700', '900'] })

export const metadata: Metadata = {
  title: {
    template: '%s | yeeway.dev',
    default: 'yeeway.dev',
  },
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  authors: [{ name: 'Alex Su', url: SITE.url }],
  alternates: {
    canonical: SITE.url,
    types: {
      'application/rss+xml': [{ url: 'feed.xml', title: 'yeeway.dev' }],
    },
  },
  icons: { icon: SITE.logo, apple: SITE.logo },
  openGraph: {
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body className={`${nunito.className} flex min-h-dvh flex-col items-center`}>
        <Providers>
          <Header />
          <div className="relative w-full grow">{children}</div>
          <Footer />
        </Providers>
      </body>
      <GoogleAnalytics gaId="G-CCEVLQFSHY" />
      <ConsoleAsciiArt />
    </html>
  )
}

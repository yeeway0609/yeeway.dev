import { GoogleAnalytics } from '@next/third-parties/google'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { ConsoleAsciiArt } from '@/components/ConsoleAsciiArt'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Providers } from '@/components/Providers'
import './global.css'
import '@fontsource/commit-mono'

const nunito = Nunito({ subsets: ['latin'], weight: ['400', '700', '900'] })

export const metadata: Metadata = {
  title: {
    template: '%s | yeeway.dev',
    default: 'yeeway.dev',
  },
  description: 'Website of Alex Su, Creative Developer.',
  metadataBase: new URL('https://yeeway.dev'),
  alternates: {
    canonical: 'https://yeeway.dev',
    types: {
      'application/rss+xml': [{ url: 'feed.xml', title: 'yeeway.dev' }],
    },
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

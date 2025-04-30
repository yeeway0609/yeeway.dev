'use client'

import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // FIXME: 重新整理時會閃爍
    <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
      {children}
    </ThemeProvider>
  )
}

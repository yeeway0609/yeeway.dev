'use client'

import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme()

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <Button className="group relative cursor-pointer rounded-sm p-2" variant="ghost" size="icon" onClick={toggleTheme}>
      <SunIcon className="group-hover:text-primary absolute size-6 transition-colors dark:hidden" />
      <MoonIcon className="group-hover:text-primary absolute hidden size-6 transition-colors dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

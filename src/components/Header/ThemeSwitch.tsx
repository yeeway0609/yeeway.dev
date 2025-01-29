'use client'

import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

export function ThemeSwitch() {
  const { setTheme } = useTheme()

  return (
    <Button className="group relative cursor-pointer rounded-sm p-2" variant="ghost" size="icon">
      <SunIcon className="absolute size-6 transition-colors group-hover:text-primary dark:hidden" onClick={() => setTheme('dark')} />
      <MoonIcon className="absolute hidden size-6 transition-colors group-hover:text-primary dark:block" onClick={() => setTheme('light')} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

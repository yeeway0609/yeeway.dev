'use client'

import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Image from 'next/image'

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  // if the component has not mounted, return a placeholder image to improve user experience
  if (!mounted)
    return (
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/4/49/A_black_image.jpg"
        width={32}
        height={32}
        sizes="32x32"
        priority={false}
        alt="Loading Light/Dark Toggle"
        title="Loading Light/Dark Toggle"
      />
    )

  if (resolvedTheme === 'dark')
    return (
      <div className="flex h-full cursor-pointer items-center justify-center">
        <MoonIcon className="size-8" onClick={() => setTheme('light')} />
      </div>
    )

  if (resolvedTheme === 'light')
    return (
      <div className="flex h-full cursor-pointer items-center justify-center">
        <SunIcon className="size-8" onClick={() => setTheme('dark')} />
      </div>
    )
}

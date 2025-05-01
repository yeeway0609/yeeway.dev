'use client'
import { useEffect, useRef } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { UAParser } from 'ua-parser-js'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  const bonkSoundRef = useRef<HTMLAudioElement | null>(null)
  const { device } = UAParser()

  useEffect(() => {
    bonkSoundRef.current = new Audio('/assets/bonk.m4a')
  }, [])

  function handlePlaySound() {
    if (device.is('mobile')) return

    if (bonkSoundRef.current) {
      bonkSoundRef.current.currentTime = 0
      bonkSoundRef.current.play()
    }
  }

  return (
    <main
      className={clsx(
        'flex min-h-[calc(100vh-var(--spacing-header))] w-full flex-col items-center justify-center select-none',
        "cursor-[url('/assets/bat.png')_32_32,auto] active:cursor-[url('/assets/bat-bonk.png')_32_32,auto] dark:active:cursor-[url('/assets/bat-bonk-white.png')_32_32,auto]"
      )}
      onMouseDown={handlePlaySound}
    >
      <div className="flex justify-center px-5">
        <img src="/assets/will-smith-meme.png" alt="will-smith-meme" width={150} height={250} draggable="false" />
        <h1 className="ml-5 pt-5 text-5xl leading-tight sm:text-7xl">Page not found</h1>
      </div>
      <Button className="mt-10 cursor-help" asChild>
        <Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
          Back to Home
        </Link>
      </Button>
    </main>
  )
}

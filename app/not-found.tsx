'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  let bonkSound = new Audio('/assets/bonk.m4a')

  const handlePlaySound = () => {
    bonkSound.play()
  }

  return (
    <main
      className="flex min-h-[calc(100vh-var(--spacing-header))] w-full cursor-[url('/assets/bat.png')_32_32,auto] flex-col items-center justify-center select-none active:cursor-[url('/assets/bat-bonk.png')_32_32,auto]"
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

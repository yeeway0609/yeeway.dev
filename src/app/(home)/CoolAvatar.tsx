'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import { useInterval } from 'usehooks-ts'
import { AudioLinesIcon } from '@/components/ui/audio-lines'
import { Marquee } from '@/components/ui/marquee'
import { getNowPlaying, type NowPlaying } from '@/lib/spotify.server'

const AVATAR_URL = '/assets/avatar-cartoon.png'
const POLL_INTERVAL = 5_000

export function CoolAvatar() {
  const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null)
  const [needsScroll, setNeedsScroll] = useState(false)
  const contentRef = useRef<HTMLElement>(null)

  useEffect(() => {
    getNowPlaying().then(setNowPlaying)
  }, [])

  useInterval(() => {
    getNowPlaying().then(setNowPlaying)
  }, POLL_INTERVAL)

  useLayoutEffect(() => {
    if (nowPlaying?.title && contentRef.current) {
      setNeedsScroll(contentRef.current.scrollWidth > 240)
    }
  }, [nowPlaying?.title, nowPlaying?.artist])

  return (
    <div>
      <Image
        className="border-border mx-auto size-32 shrink-0 rounded-full border-2 object-cover"
        src={AVATAR_URL}
        alt="Alex Su"
        width={128}
        height={128}
        priority
      />
      <div className="mt-2 flex items-center justify-center gap-1.5 text-xs">
        <AudioLinesIcon size={16} isPlaying={nowPlaying?.isPlaying ?? false} className={!nowPlaying?.title ? 'text-muted-foreground' : ''} />
        {nowPlaying && nowPlaying.title ? (
          <div className={clsx('relative max-w-60', needsScroll && 'marquee-fade-edges')}>
            {needsScroll ? (
              <Marquee repeat={2} className={clsx('p-0 [--duration:16s] [--gap:2rem]')}>
                <a
                  ref={contentRef as React.Ref<HTMLAnchorElement>}
                  className={clsx(
                    'inline-block shrink-0 whitespace-nowrap',
                    nowPlaying?.url && 'decoration-muted-foreground/50 underline underline-offset-2'
                  )}
                  href={nowPlaying?.url}
                  target="_blank"
                >
                  {nowPlaying.artist} <span className="font-normal"> - {nowPlaying.title}</span>
                </a>
              </Marquee>
            ) : (
              <a
                ref={contentRef as React.Ref<HTMLAnchorElement>}
                className={clsx(
                  'inline-block shrink-0 whitespace-nowrap',
                  nowPlaying?.url && 'decoration-muted-foreground/50 underline underline-offset-2'
                )}
                href={nowPlaying?.url}
                target="_blank"
              >
                {nowPlaying.artist} <span className="font-normal"> - {nowPlaying.title}</span>
              </a>
            )}
          </div>
        ) : (
          <span className="text-muted-foreground">目前沒在聽</span>
        )}
      </div>
    </div>
  )
}

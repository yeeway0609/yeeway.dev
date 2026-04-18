'use client'

import { useEffect, useLayoutEffect, useRef, useState, type Ref } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import { useInterval } from 'usehooks-ts'
import { AudioLinesIcon } from '@/components/ui/audio-lines'
import { Marquee } from '@/components/ui/marquee'
import { getNowPlaying, type NowPlaying } from '@/lib/spotify.server'

const AVATAR_URL = '/assets/avatar-cartoon.png'
const POLL_INTERVAL = 5_000

export function CoolAvatar() {
  const contentRef = useRef<HTMLElement>(null)
  const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null)
  const [needsScroll, setNeedsScroll] = useState(false)

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
        className="mx-auto size-32 shrink-0 rounded-full border-2 border-border object-cover"
        src={AVATAR_URL}
        alt="Alex Su"
        width={128}
        height={128}
        priority
      />

      <div className="mt-2 flex items-center justify-center gap-1.5 text-xs">
        <AudioLinesIcon
          size={16}
          isPlaying={nowPlaying?.isPlaying ?? false}
          className={!nowPlaying?.title ? 'text-muted-foreground' : ''}
        />
        {nowPlaying && nowPlaying.title ? (
          <div className={clsx('relative max-w-60', needsScroll && 'marquee-fade-edges')}>
            {needsScroll ? (
              <Marquee
                className={clsx('p-0 [--duration:16s] [--gap:2rem]')}
                repeat={2}
              >
                <NowPlayingTrackLink
                  contentRef={contentRef as Ref<HTMLAnchorElement>}
                  artist={nowPlaying.artist ?? ''}
                  title={nowPlaying.title ?? ''}
                  url={nowPlaying.url}
                />
              </Marquee>
            ) : (
              <NowPlayingTrackLink
                contentRef={contentRef as Ref<HTMLAnchorElement>}
                artist={nowPlaying.artist ?? ''}
                title={nowPlaying.title ?? ''}
                url={nowPlaying.url}
              />
            )}
          </div>
        ) : (
          <span className="text-muted-foreground">目前沒在聽</span>
        )}
      </div>
    </div>
  )
}

interface NowPlayingTrackLinkProps {
  contentRef: Ref<HTMLAnchorElement>
  artist: string
  title: string
  url?: string
}

function NowPlayingTrackLink({ contentRef, artist, title, url }: NowPlayingTrackLinkProps) {
  return (
    <a
      className={clsx(
        'inline-block shrink-0 whitespace-nowrap',
        url && 'underline decoration-muted-foreground/50 underline-offset-2',
      )}
      ref={contentRef}
      href={url}
      target="_blank"
    >
      <span className="font-semibold">{artist}</span> - {title}
    </a>
  )
}

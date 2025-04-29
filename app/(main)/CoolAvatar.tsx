'use client'

import { useState } from 'react'
import clsx from 'clsx'
import Image from 'next/image'

const AVATAR_URL = '/assets/avatar-cartoon.png'
const BADGE_DURATION = 3000
// TODO: 加上更多訊息
const messages = ['你好！😆', 'Hey Bro 😎', '火鍋不能加芋頭', '咖哩飯拌了還能吃嗎', '(⁎⁍̴̛ᴗ⁍̴̛⁎)']

export default function CoolAvatar() {
  const [badge, setBadge] = useState<{
    x: number
    y: number
    message: string
  } | null>(null)

  const [isTextShown, setIsTextShown] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    if (isTextShown) return

    const { clientX, clientY } = e

    const randomMessage = messages[Math.floor(Math.random() * messages.length)]
    setBadge({ x: clientX, y: clientY, message: randomMessage })

    setIsTextShown(true)
    setTimeout(() => {
      setIsTextShown(false)
    }, BADGE_DURATION)
  }

  return (
    <>
      <Image
        className="border-border size-32 shrink-0 cursor-pointer rounded-full border-2 object-cover"
        src={AVATAR_URL}
        onClick={handleClick}
        alt="Yiwei Su"
        width={128}
        height={128}
      />

      <div
        className={clsx(
          'bg-primary-foreground border-border pointer-events-none fixed z-50 -translate-x-[calc(50%-10px)] rounded-full border px-3 py-1 text-sm text-white opacity-0',
          isTextShown ? 'animate-badge-popup' : ''
        )}
        style={{
          top: badge?.y ?? 0,
          left: badge?.x ?? 0,
        }}
      >
        {badge?.message}
      </div>
    </>
  )
}

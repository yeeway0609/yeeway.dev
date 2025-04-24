'use client'

// import { useState } from 'react'
// import clsx from 'clsx'
import Image from 'next/image'

export function MyAvatar() {
  // const lines = ['你好！😆', 'Hey Bro 😎', '火鍋不能加芋頭', '咖哩飯拌了還能吃嗎', '(⁎⁍̴̛ᴗ⁍̴̛⁎)', '文星伊一生推']

  // const [showText, setShowText] = useState(false)
  // const [textBadge, setTextBadge] = useState({ text: '', x: 0, y: 0 })

  // FIXME: 點擊右側一點的bubble 會跑版，應該是max-w 的問題
  // const talkWithMe = (e: any) => {
  //   const randomIndex = Math.floor(Math.random() * lines.length)
  //   setTextBadge({ text: lines[randomIndex], x: e.clientX, y: e.clientY })
  //   setShowText(true)

  //   setTimeout(() => {
  //     setShowText(false)
  //   }, 1000)
  // }

  return (
    <div className="mb-8 size-[200px] cursor-pointer overflow-hidden rounded-full bg-linear-to-br from-[#757F9A] to-[#D7DDE8]">
      <Image src="/yiwei-avatar.jpeg" alt="Yiwei Su" width={200} height={200} />
      {/* <div
        style={{ left: textBadge.x, top: textBadge.y - 20 }}
        className={clsx('border-border bg-card absolute rounded-full border px-2.5 py-1 text-sm opacity-0', showText && 'animate-fade-in-out')}
      >
        {textBadge.text}
      </div> */}
    </div>
  )
}

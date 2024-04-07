"use client";

import { useState } from "react";
import Image from "next/image";

export default function MyAvatar() {
  const lines = [
    "你好！😆",
    "Hey Bro 😎",
    "火鍋不能加芋頭",
    "咖哩飯拌了還能吃嗎",
    "(⁎⁍̴̛ᴗ⁍̴̛⁎)",
    "文星伊一生推",
  ];

  const [showText, setShowText] = useState(false);
  const [textBadge, setTextBadge] = useState({ text: "", x: 0, y: 0 });

  const talkWithMe = (e: any) => {
    const randomIndex = Math.floor(Math.random() * lines.length);
    setTextBadge({ text: lines[randomIndex], x: e.clientX, y: e.clientY });
    setShowText(true);

    setTimeout(() => {
      setShowText(false);
    }, 1000);
  };

  return (
    <div
      className="size-[200px] mb-8 cursor-pointer overflow-hidden rounded-full bg-gradient-to-br from-[#757F9A] to-[#D7DDE8]"
      onClick={talkWithMe}
    >
      <Image src="/alex_su.png" alt="Alex Su" width={200} height={200} />
      <div
        style={{left: textBadge.x, top: textBadge.y - 20}}
        className={`
          absolute rounded-full border border-border bg-card px-2.5 py-1 text-sm opacity-0
          ${showText ? "animate-fade-in-out" : ""}
        `}
      >
        {textBadge.text}
      </div>
    </div>
  );
}
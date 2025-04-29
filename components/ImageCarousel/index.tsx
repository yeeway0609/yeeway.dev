'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'

type Item = {
  url: string
  title: string
  description: string
}

const items: Item[] = [
  {
    url: '/assets/gdsc-journey/1.jpg',
    title: '',
    description: '',
  },
  {
    url: '/assets/gdsc-journey/2.jpg',
    title: '',
    description: '',
  },
  {
    url: '/assets/gdsc-journey/2.jpg',
    title: '',
    description: '',
  },
  {
    url: '/assets/gdsc-journey/2.jpg',
    title: '',
    description: '',
  },
]

export function ImageCarousel() {
  const [width, setWidth] = useState(0)
  const carousel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    }
  }, [carousel])

  return (
    <div className="w-full">
      <motion.div
        ref={carousel}
        drag="x"
        whileDrag={{ scale: 0.95 }}
        dragElastic={0.2}
        dragConstraints={{ right: 0, left: -width }}
        dragTransition={{ bounceDamping: 30 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="flex cursor-grab will-change-transform active:cursor-grabbing"
      >
        {items.map((itemData: Item, index: number) => (
          <motion.div key={index} className="h-[200px] w-[300px] shrink-0 p-2">
            <Image
              className="pointer-events-none size-full rounded-md object-cover"
              src={itemData?.url}
              title={itemData.title}
              alt={itemData.description}
              width={400}
              height={200}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

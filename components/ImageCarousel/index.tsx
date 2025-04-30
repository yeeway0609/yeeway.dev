'use client'

import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { motion } from 'motion/react'
import Image from 'next/image'
import { CarouselImage } from '@/lib/types'

type ImageCarouselProps = {
  images: CarouselImage[]
  align?: 'left' | 'center' | 'right'
}

const possibleRotations = [1.3, -1.3, 1.3, -1.3, 1.3, -1.3]

export function ImageCarousel({ images, align = 'left' }: ImageCarouselProps) {
  const [width, setWidth] = useState(0)
  const carousel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    }
  }, [carousel])

  return (
    <div className="hide-scrollbar w-full max-w-dvw overflow-x-hidden px-5 py-5">
      <motion.div
        ref={carousel}
        drag="x"
        whileDrag={{ scale: 0.95 }}
        dragElastic={0.2}
        dragConstraints={{ right: 0, left: -width }}
        dragTransition={{ bounceDamping: 30 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className={clsx(
          'flex cursor-grab gap-8 will-change-transform active:cursor-grabbing',
          align === 'left' && 'justify-start',
          align === 'center' && 'justify-center',
          align === 'right' && 'justify-end'
        )}
      >
        {images.map((image, index: number) => (
          <motion.div
            key={index}
            className="relative aspect-[9/10] w-[200px] shrink-0"
            initial={{ scale: 1, rotate: possibleRotations[index % possibleRotations.length], opacity: 0 }}
            whileHover={{ scale: 1.1, rotate: 0, transition: { duration: 0.2 } }}
            whileInView={{ opacity: 1, transition: { delay: index / 100 } }}
          >
            <Image
              className="pointer-events-none absolute inset-0 size-full rounded-md object-cover"
              src={image?.url}
              title={image.title}
              alt={image.description}
              width={300}
              height={300}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

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
    <div className="hide-scrollbar w-full max-w-dvw overflow-x-auto px-5 py-5">
      <motion.div
        ref={carousel}
        drag="x"
        whileDrag={{ scale: 0.95 }}
        dragElastic={0.2}
        dragConstraints={{ right: 0, left: -width }}
        dragTransition={{ bounceDamping: 30 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className={clsx(
          'flex cursor-grab items-center gap-8 will-change-transform active:cursor-grabbing',
          align === 'left' && 'justify-start',
          align === 'center' && 'justify-center',
          align === 'right' && 'justify-end'
        )}
      >
        {images.map((image, index: number) => (
          <motion.figure
            key={index}
            className="group relative shrink-0"
            style={{ width: image.width ?? 200, height: image.height ?? 200 }}
            initial={{ scale: 1, rotate: possibleRotations[index % possibleRotations.length], opacity: 0 }}
            whileHover={{ scale: 1.1, rotate: 0, transition: { duration: 0.2 } }}
            whileInView={{ opacity: 1, transition: { delay: index / 100 } }}
          >
            <Image
              className="pointer-events-none size-full rounded-md object-cover"
              src={image?.url}
              alt={image.title ?? ''}
              width={300}
              height={300}
            />
            {image.title && (
              <div className="absolute inset-0 flex size-full items-end bg-gradient-to-t from-black/75 via-black/0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <figcaption className="px-3 py-2 text-sm font-bold">{image.title}</figcaption>
              </div>
            )}
          </motion.figure>
        ))}
      </motion.div>
    </div>
  )
}

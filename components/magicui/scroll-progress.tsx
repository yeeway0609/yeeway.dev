'use client'

import React from 'react'
import { motion, MotionProps, useScroll } from 'motion/react'
import { cn } from '@/lib/utils'
interface ScrollProgressProps extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps> {}

export const ScrollProgress = React.forwardRef<HTMLDivElement, ScrollProgressProps>(({ className, ...props }, ref) => {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      ref={ref}
      className={cn('bg-primary sticky inset-x-0 top-0 z-50 h-px origin-left', className)}
      style={{
        scaleX: scrollYProgress,
      }}
      {...props}
    />
  )
})

ScrollProgress.displayName = 'ScrollProgress'

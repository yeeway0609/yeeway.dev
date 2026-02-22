'use client'

import { motion, MotionProps, useScroll } from 'motion/react'

import { cn } from '@/lib/utils'

interface ScrollProgressProps extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps> {
  ref?: React.Ref<HTMLDivElement>
}

export function ScrollProgress({ className, ref, ...props }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      ref={ref}
      className={cn('bg-primary fixed inset-x-0 top-0 z-50 h-px origin-left', className)}
      style={{
        scaleX: scrollYProgress,
      }}
      {...props}
    />
  )
}

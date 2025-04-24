'use client'

import clsx from 'clsx'
import { motion } from 'motion/react'
import Image from 'next/image'
import VulcanSaluteIcon from '@/assets/fluent-emoji-vulcan-salute.png'

type SplitTitleProps = {
  className?: string
}

const text = ['Hi, ', "I'm ", 'Yiwei ', 'Su']

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const wordVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 20,
    },
  },
}

export default function SplitTitle({ className }: SplitTitleProps) {
  return (
    <motion.h1
      className={clsx(
        'flex flex-wrap items-center text-center text-3xl font-black tracking-wider whitespace-pre sm:text-5xl sm:leading-tight',
        className
      )}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {text.map((word, index) => (
        <motion.span key={index} variants={wordVariants}>
          {word}
        </motion.span>
      ))}
      <motion.div className="ml-2 flex aspect-square h-full items-center justify-center" variants={wordVariants}>
        <Image className="inline-block size-9 sm:size-12" src={VulcanSaluteIcon} alt="vulcan-salute" width={48} height={48} />
      </motion.div>
    </motion.h1>
  )
}

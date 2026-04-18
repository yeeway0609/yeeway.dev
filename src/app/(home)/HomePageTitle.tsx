'use client'

import { motion } from 'motion/react'
import Image from 'next/image'

const text = ['Hi, ', 'I\'m ', 'Alex ', 'Su']

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
      type: 'spring' as const,
      stiffness: 500,
      damping: 20,
    },
  },
}

export function HomePageTitle() {
  return (
    <motion.h1
      className="mt-8 flex flex-wrap items-center text-center text-3xl font-extrabold tracking-wider whitespace-pre sm:text-5xl sm:leading-tight"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {text.map((word, index) => (
        <motion.span key={index} variants={wordVariants}>
          {word}
        </motion.span>
      ))}
      <motion.div
        className="-mt-2 ml-2 flex aspect-square h-full items-center justify-center"
        variants={wordVariants}
      >
        <Image className="inline-block size-9 sm:size-12" src="/assets/fluent-emoji-vulcan-salute.png" alt="vulcan-salute" width={48} height={48} />
      </motion.div>
    </motion.h1>
  )
}

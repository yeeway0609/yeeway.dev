'use client'

import clsx from 'clsx'
import { useState } from 'react'
import { Icon } from '@iconify/react'

type CopyButtonProps = {
  text: string
  className?: string
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setHasCopied(true)
      setTimeout(() => setHasCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy text:', error)
    }
  }

  return (
    <button onClick={handleCopy} className={clsx('flex size-6 cursor-pointer items-center justify-center rounded hover:bg-gray-500/50', className)}>
      <Icon icon={hasCopied ? 'tabler:check' : 'tabler:copy'} className="size-3.5" />
    </button>
  )
}

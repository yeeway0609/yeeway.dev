// TODO: 在手機版會縮小，目前先單純隱藏
'use client'

import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import clsx from 'clsx'
import { BlogTOC } from '@/lib/types'

type TableOfContentsProps = {
  toc: BlogTOC
}

export function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeHeading, setActiveHeading] = useState<string>('')

  useEffect(() => {
    const headingElements = document.querySelectorAll('h2, h3')

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-64px 0px -30% 0px', // EXPLAIN: 64px 是 Header 的高度
    })

    function observerCallback(entries: IntersectionObserverEntry[]) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveHeading(entry.target.id)
      })
    }

    headingElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  return (
    <nav className="top-header sticky z-10 hidden max-h-[calc(100vh-var(--spacing-header))] w-60 shrink-0 list-none overflow-y-auto py-6 lg:block">
      <div className="flex text-xl">
        <Icon icon="quill:list" className="mr-1 mb-2 size-7" />
        <span>目錄</span>
      </div>
      {toc.map(({ level, heading }) => (
        <a
          key={heading}
          className={clsx(
            'text-muted-foreground hover:text-foreground mb-2 block text-base',
            level === 3 ? 'ml-4 text-sm' : '',
            heading === activeHeading ? 'text-primary' : ''
          )}
          href={`#${heading}`}
        >
          {heading}
        </a>
      ))}
      <a className="text-muted-foreground hover:text-foreground flex items-center text-base" href="#">
        <Icon icon="icon-park-outline:arrow-circle-up" className="mr-1.5 size-4.5" />
        <span className="-mb-px">回到頂端</span>
      </a>
    </nav>
  )
}

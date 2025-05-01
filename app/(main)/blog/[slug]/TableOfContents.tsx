'use client'
import { useEffect, useState } from 'react'
import { TableOfContents as TableOfContentsType } from '@/lib/types'
import clsx from 'clsx'
import { Icon } from '@iconify/react'

type TableOfContentsProps = {
  toc: TableOfContentsType
}

export function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeHeading, setActiveHeading] = useState<string>('')

  useEffect(() => {
    const headingElements = document.querySelectorAll('h2, h3')

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-64px 0px -30% 0px', // 64px 是 Header 的高度，50% 代表畫面的中間高度
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
    <nav className="top-header sticky z-10 hidden w-60 shrink-0 overflow-y-auto pt-5 lg:block">
      <ul className="">
        <div className="flex text-xl">
          <Icon icon="quill:list" className="mr-1 mb-2 size-7" />
          <span>目錄</span>
        </div>
        {toc.map(({ level, heading }) => (
          <li
            key={heading}
            className={clsx(
              'text-muted-foreground hover:text-foreground mb-2 text-base',
              level === 3 ? 'ml-4 text-sm' : '',
              heading === activeHeading ? 'text-primary' : ''
            )}
          >
            <a href={`#${heading}`}>{heading}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

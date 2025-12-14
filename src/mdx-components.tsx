import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import type { BundledLanguage } from 'shiki'
import { CodeBlock } from '@/components/CodeBlock'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    p: ({ children }) => <div className="content-text mb-4 sm:mb-6">{children}</div>,
    h2: ({ children }) => (
      <h2 id={children as string} className="text-primary mt-8 mb-4 scroll-mt-20 text-xl leading-tight font-bold sm:text-2xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 id={children as string} className="mt-8 mb-4 scroll-mt-20 text-xl leading-snug font-bold">
        {children}
      </h3>
    ),
    hr: () => <hr className="mt-2 mb-5" />,
    blockquote: ({ children }) => (
      <blockquote className="border-muted-foreground text-muted-foreground my-4 border-l-4 pr-4 pl-4 text-sm sm:text-lg">{children}</blockquote>
    ),
    ul: ({ children }) => <ul className="content-text mb-4 list-disc pl-6 sm:mb-6">{children}</ul>,
    ol: ({ children }) => <ol className="content-text mb-4 list-decimal pl-6 sm:mb-6">{children}</ol>,
    li: ({ children }) => <li className="mb-2 leading-relaxed">{children}</li>,
    kbd: ({ children }) => (
      <kbd className="inline-block rounded border px-1 py-5 align-middle font-mono text-xs font-normal shadow-sm">{children}</kbd>
    ),
    table: ({ children }) => <table className="content-text border-gray-600 text-lg">{children}</table>,
    th: ({ children }) => <th className="border px-3 py-1">{children}</th>,
    td: ({ children }) => <td className="border px-3 py-1">{children}</td>,
    strong: ({ children }) => <strong className="content-text font-bold">{children}</strong>,
    a: ({ children, href }) => (
      <a className="link" href={href} target="_blank" rel="noopener noreferrer" aria-label={children}>
        {children}
      </a>
    ),
    img: (props) => {
      const { src, alt } = props
      const { altText, width, height } = parseImgAlt(alt)
      return (
        src && (
          <figure className="group relative mx-auto" style={{ maxWidth: `${width}px`, maxHeight: `${height}px` }}>
            <Image
              className="size-full object-cover"
              style={{ maxWidth: `${width}px`, maxHeight: `${height}px` }}
              src={src}
              alt={altText}
              width={width}
              height={height}
            />
            {altText && (
              <span className="absolute -bottom-px flex h-1/2 w-full items-end bg-gradient-to-t from-black/60 via-black/0 opacity-0 transition-opacity group-hover:opacity-100">
                <figcaption className="px-3 py-2 text-sm font-bold">{altText}</figcaption>
              </span>
            )}
          </figure>
        )
      )
    },
    pre: (props) => {
      const codeElement = props.children
      if (codeElement && codeElement.type === 'code') {
        const { children, className } = codeElement.props as { children: string; className?: string }
        const lang = className?.replace('language-', '') as BundledLanguage

        return (
          <CodeBlock lang={lang} fileName={props['filename']}>
            {children}
          </CodeBlock>
        )
      }
      return <pre {...props} />
    },
    ...components,
  }
}

/**
 * 狀況 1: ![說明文字@600x400](圖片網址)，有 alt 文字和寬高
 * 狀況 2: ![說明文字](圖片網址)，只有 alt 文字但不指定寬高
 * 狀況 3: ![@600x400](圖片網址)，只指定寬高但 alt 文字為空
 */
function parseImgAlt(alt?: string): { altText: string; width: number; height: number } {
  const DEFAULT_MAX_WIDTH = 768
  const DEFAULT_MAX_HEIGHT = 768

  if (!alt) return { altText: '', width: DEFAULT_MAX_WIDTH, height: DEFAULT_MAX_HEIGHT }

  const match = alt.match(/^(.*?)@?(\d+)x(\d+)$/)
  if (match) {
    const altText = match[1]?.trim() || ''
    const width = Number(match[2])
    const height = Number(match[3])
    return { altText, width, height }
  }

  return { altText: alt, width: DEFAULT_MAX_WIDTH, height: DEFAULT_MAX_HEIGHT }
}

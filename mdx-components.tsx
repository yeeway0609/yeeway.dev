import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import type { BundledLanguage } from 'shiki'
import { CodeBlock } from '@/components/CodeBlock'
import { ImageContainer } from '@/components/ImageContainer'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    p: ({ children }) => <p className="content-text my-6">{children}</p>,
    h2: ({ children }) => (
      <h2 id={children as string} className="text-primary mt-6 mb-4 scroll-mt-20 text-2xl leading-tight font-bold sm:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 id={children as string} className="mt-6 mb-4 scroll-mt-20 text-xl leading-snug font-bold">
        {children}
      </h3>
    ),
    hr: () => <hr className="mt-2 mb-5" />,
    blockquote: ({ children }) => (
      <blockquote className="border-muted-foreground text-muted-foreground my-4 border-l-4 pr-4 pl-4 text-sm sm:text-lg">{children}</blockquote>
    ),
    ul: ({ children }) => <ul className="list-disc pl-8">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal pl-8">{children}</ol>,
    kbd: ({ children }) => (
      <kbd className="inline-block rounded border px-1 py-5 align-middle font-mono text-xs font-normal shadow-sm">{children}</kbd>
    ),
    table: ({ children }) => <table className="border-gray-600 text-lg">{children}</table>,
    th: ({ children }) => <th className="border px-3 py-1">{children}</th>,
    td: ({ children }) => <td className="border px-3 py-1">{children}</td>,
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    a: ({ children, href }) => (
      <a
        className="cursor-pointer font-bold text-blue-400 underline underline-offset-2 hover:text-blue-600"
        href={href}
        target="_blank"
        rel="noopener"
        aria-label={children}
      >
        {children}
      </a>
    ),
    img: (props) => (
      <ImageContainer className="mx-auto my-6 w-fit">
        <Image {...props} alt={props.alt ?? 'image'} />
      </ImageContainer>
    ),
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

    // DEPRECATED: 文章裡面只能出現 h2 和 h3，配合 TOC 的架構
    // h4: ({ children }) => <h4 className="mt-6 mb-4 leading-none font-bold">{children}</h4>,
    // h5: ({ children }) => <h5 className="mt-6 mb-4 leading-tight font-bold">{children}</h5>,
    // h6: ({ children }) => <h6 className="text-muted-foreground mt-6 mb-4 leading-tight font-bold">{children}</h6>,
  }
}

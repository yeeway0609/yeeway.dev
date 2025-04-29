import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => <h2 className="text-primary mt-6 mb-4 text-2xl leading-tight font-bold sm:text-3xl">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-6 mb-4 leading-snug font-bold">{children}</h3>,
    h4: ({ children }) => <h4 className="mt-6 mb-4 leading-none font-bold">{children}</h4>,
    h5: ({ children }) => <h5 className="mt-6 mb-4 leading-tight font-bold">{children}</h5>,
    h6: ({ children }) => <h6 className="text-muted-foreground mt-6 mb-4 leading-tight font-bold">{children}</h6>,
    hr: () => <hr className="mt-2 mb-5" />,
    blockquote: ({ children }) => (
      <blockquote className="border-muted-foreground text-muted-foreground my-2 border-l-4 pr-4 pl-4 text-lg">{children}</blockquote>
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
    pre: ({ children }) => <pre className="my-2 overflow-y-hidden rounded bg-gray-200 p-4 dark:bg-gray-700">{children}</pre>,
    code: ({ children }) => <code className="rounded bg-gray-200 font-mono text-sm dark:bg-gray-700">{children}</code>,
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
      <div className="relative mx-auto my-6 w-fit">
        <div className="absolute size-full animate-pulse bg-gray-300 dark:bg-gray-800" />
        <Image className="relative" {...props} alt={props.alt ?? 'image'} />
      </div>
    ),
    ...components,
  }
}

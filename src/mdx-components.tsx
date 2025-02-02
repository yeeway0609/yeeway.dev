import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => <h2 className="mb-4 mt-6 text-2xl font-bold leading-tight text-primary sm:text-3xl">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-4 mt-6 font-bold leading-snug">{children}</h3>,
    h4: ({ children }) => <h4 className="mb-4 mt-6 font-bold leading-none">{children}</h4>,
    h5: ({ children }) => <h5 className="mb-4 mt-6 font-bold leading-tight">{children}</h5>,
    h6: ({ children }) => <h6 className="mb-4 mt-6 font-bold leading-tight text-muted-foreground">{children}</h6>,
    hr: () => <hr className="mb-5 mt-2" />,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-muted-foreground pl-4 pr-4 text-lg text-muted-foreground">{children}</blockquote>
    ),
    pre: ({ children }) => <pre className="overflow-y-hidden rounded bg-gray-200 p-4 dark:bg-gray-700">{children}</pre>,
    code: ({ children }) => <code className="inline rounded bg-gray-200 font-mono text-sm dark:bg-gray-700">{children}</code>,
    ul: ({ children }) => <ul className="list-disc pl-8">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal pl-8">{children}</ol>,
    kbd: ({ children }) => <kbd className="inline-block rounded border px-1 py-5 align-middle font-mono text-xs font-normal shadow">{children}</kbd>,
    table: ({ children }) => <table className="border-gray-600 text-lg">{children}</table>,
    th: ({ children }) => <th className="border px-3 py-1">{children}</th>,
    td: ({ children }) => <td className="border px-3 py-1">{children}</td>,
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    a: ({ children, href }) => (
      <a className="font-bold text-blue-600 underline underline-offset-2" href={href}>
        {children}
      </a>
    ),
    img: (props) => <img className="mx-auto my-6" {...props} />,
    ...components,
  }
}

export function MdxImage({ src, alt }: { src: string; alt: string }) {
  return <Image className="mx-auto my-6 sm:my-8 md:my-10" src={src} alt={alt} />
}

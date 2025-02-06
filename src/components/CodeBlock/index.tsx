import { codeToHtml } from 'shiki'
import type { BundledLanguage } from 'shiki'

interface CodeBlockProps {
  children: string
  lang: BundledLanguage
}

export async function CodeBlock({ children, lang }: CodeBlockProps) {
  const output = await codeToHtml(children, {
    lang: lang,
    theme: 'github-dark',
  })

  return (
    <div
      className="my-3 rounded-xl text-sm sm:text-base [&_pre]:overflow-x-auto [&_pre]:rounded [&_pre]:px-4 [&_pre]:py-3"
      dangerouslySetInnerHTML={{ __html: output }}
    />
  )
}

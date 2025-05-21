import { Icon } from '@iconify/react'
import { codeToHtml } from 'shiki'
import type { BundledLanguage } from 'shiki'
import { CopyButton } from './CopyButton'

type CodeBlockProps = {
  children: string
  lang: BundledLanguage
  fileName?: string
}

const iconMap: Partial<Record<BundledLanguage, string>> = {
  html: 'lineicons:code-1',
  css: 'lineicons:css3',
  js: 'lineicons:javascript',
  ts: 'lineicons:typescript',
  jsx: 'lineicons:react',
  json: 'codicon:json',
  md: 'lineicons:markdown',
}

export async function CodeBlock({ children, lang, fileName }: CodeBlockProps) {
  const output = await codeToHtml(children, {
    lang,
    theme: 'github-dark',
  })

  return (
    <div className="my-3 overflow-clip rounded-xl border border-[#313131]">
      <div className="flex items-center border-b border-[#313131] bg-[#262626] px-4 py-1.5 text-gray-300">
        <Icon icon={iconMap[lang] ? iconMap[lang] : 'lineicons:code-1'} className="mr-2 size-4" />
        <span className="text-xs leading-none sm:text-sm">{fileName}</span>
        <CopyButton className="ml-auto" text={children} />
      </div>
      <div className="text-sm sm:text-base [&_pre]:overflow-x-auto [&_pre]:px-4 [&_pre]:py-3" dangerouslySetInnerHTML={{ __html: output }} />
    </div>
  )
}

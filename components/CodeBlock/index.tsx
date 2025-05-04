import { Icon } from '@iconify/react'
import { codeToHtml } from 'shiki'
import type { BundledLanguage } from 'shiki'
import { CopyButton } from './CopyButton'

type IconLanguage = 'html' | 'css' | 'js' | 'ts' | 'react' | 'json' | 'md'

type CodeBlockProps = {
  children: string
  lang: BundledLanguage
  title?: string
  icon?: IconLanguage
}

const iconMap: Record<IconLanguage, string> = {
  html: 'lineicons:code-1',
  css: 'lineicons:css3',
  js: 'lineicons:javascript',
  ts: 'lineicons:typescript',
  react: 'lineicons:react',
  json: 'codicon:json',
  md: 'lineicons:markdown',
}

export async function CodeBlock({ children, lang, title, icon }: CodeBlockProps) {
  const output = await codeToHtml(children, {
    lang: lang,
    theme: 'github-dark',
  })

  return (
    <div className="my-3 overflow-clip rounded-xl border border-[#313131]">
      <div className="flex items-center border-b border-[#313131] bg-[#262626] px-4 py-1.5 text-gray-300">
        <Icon icon={icon ? iconMap[icon] : 'lineicons:code-1'} className="mr-2 size-4" />
        <span className="text-xs leading-none sm:text-sm">{title}</span>
        <CopyButton className="ml-auto" text={children} />
      </div>
      <div className="text-sm sm:text-base [&_pre]:overflow-x-auto [&_pre]:px-4 [&_pre]:py-3" dangerouslySetInnerHTML={{ __html: output }} />
    </div>
  )
}

// TODO: 將 h2 標題加入目錄 (TOC 元件可以參考 tailwind 文件)
// TODO: 將 h2 標題 anchor 加到路由

import type { Metadata } from 'next'
import { Badge } from '@/components/ui/badge'
import { getBlogMetadata, getAllBlogMetadata } from '@/lib/mdx.utils'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug
  const frontmatter = getBlogMetadata(slug)
  const { default: PostContent } = await import(`@/content/blog/${slug}.mdx`)

  return (
    <main className="mx-auto max-w-(--breakpoint-sm)">
      <h1 className="my-4 text-3xl font-bold sm:my-8 sm:text-5xl">{frontmatter.title}</h1>
      <div className="flex">
        <time className="text-muted-foreground mr-4 text-lg">{frontmatter.publishedOn.toLocaleDateString('zh-TW')}</time>
        <ul>
          {frontmatter.labels.map((label) => (
            <Badge key={label} className="mr-2 font-bold">
              #{label}
            </Badge>
          ))}
        </ul>
      </div>
      <hr className="mt-2 mb-5" />

      <article className="text-foreground text-base leading-normal break-words sm:text-xl">
        <PostContent />
      </article>
    </main>
  )
}

export const dynamicParams = false // accessing a route not defined in generateStaticParams will get 404.

export function generateStaticParams() {
  const metadataSet = getAllBlogMetadata()
  const slugs = metadataSet.map((metadata) => ({ slug: metadata.slug }))
  return slugs
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const DEFAULT_OG_IMAGE = '/og.png'
  const slug = (await params).slug
  const metadata = getBlogMetadata(slug)

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      type: 'article',
      url: `/blog/${slug}`,
      images: [
        {
          url: metadata.ogImageUrl ?? DEFAULT_OG_IMAGE,
        },
      ],
    },
  }
}

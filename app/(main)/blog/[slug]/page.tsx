import { Icon } from '@iconify/react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { ScrollProgress } from '@/components/magicui/scroll-progress'
import { Badge } from '@/components/ui/badge'
import { DEFAULT_COVER_IMAGE } from '@/lib/constants'
import { getBlogData, getAllBlogData, getBlogTOC } from '@/lib/mdx.utils'
import { formatDate } from '@/lib/utils'
import { TableOfContents } from './TableOfContents'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug
  const data = getBlogData(slug)
  const toc = getBlogTOC(slug)
  const { default: PostContent } = await import(`@/content/blog/${slug}.mdx`)

  return (
    <main className="w-full pb-20">
      <ScrollProgress className="top-header h-[1.5px]" />

      <div className="layout-container flex items-start justify-between lg:gap-6">
        <div className="w-full max-w-3xl">
          <h1 className="mt-4 mb-2 text-2xl font-bold break-all sm:mt-8 sm:text-3xl sm:leading-tight sm:break-normal">{data.title}</h1>
          <p className="text-muted-foreground content-text mb-3">{data.description}</p>

          <div className="mb-4 flex items-center">
            <Icon icon="uil:calender" className="text-muted-foreground mr-2 size-4" />
            <time className="text-muted-foreground mr-4 pt-0.5 text-sm sm:text-base">{formatDate(data.publishedOn)}</time>
            {data.tags.map((tag) => (
              <Badge key={tag} className="mr-2 px-1.5 py-px text-xs font-medium">
                #{tag}
              </Badge>
            ))}
          </div>
          {data.coverImageUrl && (
            <Image
              className="animate-img-loading mb-4 w-full"
              src={data.coverImageUrl}
              alt={`${data.title} - 封面`}
              width={600}
              height={315}
              priority
            />
          )}

          <article className="content-text [&_img]:animate-img-loading w-full [&_img]:mx-auto [&_img]:mb-6 [&_video]:mx-auto">
            <PostContent />
          </article>
        </div>

        <TableOfContents toc={toc} />
      </div>
    </main>
  )
}

export const dynamicParams = false // accessing a route not defined in generateStaticParams will get 404.

export function generateStaticParams() {
  const dataSet = getAllBlogData()
  const slugs = dataSet.map((data) => ({ slug: data.slug }))
  return slugs
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = (await params).slug
  const data = getBlogData(slug)

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      type: 'article',
      url: `/blog/${slug}`,
      images: [
        {
          url: data.coverImageUrl ?? DEFAULT_COVER_IMAGE,
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}

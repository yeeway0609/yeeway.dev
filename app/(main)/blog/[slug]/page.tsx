import type { Metadata } from 'next'
import Image from 'next/image'
import { ImageContainer } from '@/components/ImageContainer'
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
          <h1 className="mt-4 mb-2 text-3xl font-bold break-all sm:mt-8 sm:text-5xl sm:leading-tight sm:break-normal">{data.title}</h1>
          <p className="text-muted-foreground mb-3 text-sm sm:text-lg">{data.description}</p>

          {data.coverImageUrl && (
            <ImageContainer className="mb-4 w-full">
              <Image className="size-full" src={data.coverImageUrl} alt={`${data.title} - 封面`} width={600} height={315} priority />
            </ImageContainer>
          )}

          <div className="mb-4 flex items-center">
            <time className="text-muted-foreground mr-4 pt-0.5 text-lg">{formatDate(data.publishedOn)}</time>
            {data.tags.map((tag) => (
              <Badge key={tag} className="mr-2 text-xs font-medium">
                #{tag}
              </Badge>
            ))}
          </div>
          <hr className="bg-border mb-5 h-0.5" />

          <article className="content-text w-full">
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

import type { Metadata } from 'next'
import Image from 'next/image'
import { ImageContainer } from '@/components/ImageContainer'
import { ScrollProgress } from '@/components/magicui/scroll-progress'
import { Badge } from '@/components/ui/badge'
import { getBlogMetadata, getAllBlogMetadata, getBlogTOC } from '@/lib/mdx.utils'
import { TableOfContents } from './TableOfContents'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug
  const metadata = getBlogMetadata(slug)
  const toc = getBlogTOC(slug)
  const { default: PostContent } = await import(`@/content/blog/${slug}.mdx`)

  return (
    <main className="mb-20 w-full">
      <ScrollProgress className="top-header h-[1.5px]" />

      <div className="layout-container flex items-start justify-evenly lg:gap-6">
        <div className="w-full max-w-3xl">
          <h1 className="mt-4 mb-2 text-3xl font-bold break-all sm:mt-8 sm:text-5xl sm:leading-tight sm:break-normal">{metadata.title}</h1>
          <p className="text-muted-foreground mb-3 text-sm sm:text-lg">{metadata.description}</p>

          {metadata.coverImageUrl && (
            <ImageContainer className="mb-4 w-full">
              <Image className="size-full" src={metadata.coverImageUrl} alt={`${metadata.title} - 封面`} width={600} height={315} priority />
            </ImageContainer>
          )}

          <div className="mb-4 flex items-center">
            <time className="text-muted-foreground mr-4">{metadata.publishedOn.toLocaleDateString('zh-TW')}</time>
            <ul>
              {metadata.labels.map((label) => (
                <Badge key={label} className="mr-2 text-sm font-bold">
                  #{label}
                </Badge>
              ))}
            </ul>
          </div>
          <hr className="bg-border mb-5 h-0.5" />

          <article className="text-foreground w-full text-base leading-normal break-words sm:text-xl">
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
          url: metadata.coverImageUrl ?? DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}

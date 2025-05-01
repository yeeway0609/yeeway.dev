import type { Metadata } from 'next'
import { Badge } from '@/components/ui/badge'
import { getBlogMetadata, getAllBlogMetadata, getBlogToc } from '@/lib/mdx.utils'
import { ScrollProgress } from '@/components/magicui/scroll-progress'
import { TableOfContents } from './TableOfContents'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug
  const metadata = getBlogMetadata(slug)
  const toc = getBlogToc(slug)
  const { default: PostContent } = await import(`@/content/blog/${slug}.mdx`)

  return (
    <main className="w-full mb-20">
      <ScrollProgress className="top-header h-[1.5px]" />

      <div className="layout-container">
        <h1 className="my-4 max-w-3xl text-3xl font-bold sm:mt-8 sm:text-5xl sm:leading-tight">{metadata.title}</h1>
        <div className="flex">
          <time className="text-muted-foreground mr-4 text-lg">{metadata.publishedOn.toLocaleDateString('zh-TW')}</time>
          <ul>
            {metadata.labels.map((label) => (
              <Badge key={label} className="mr-2 text-sm font-bold">
                #{label}
              </Badge>
            ))}
          </ul>
        </div>
        <hr className="bg-border mt-4 h-0.5" />

        <div className="flex items-start justify-evenly lg:gap-6">
          <article className="text-foreground mt-5 w-full max-w-3xl text-base leading-normal break-words sm:text-xl">
            <PostContent />
          </article>

          <TableOfContents toc={toc} />
        </div>
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
  const postMetadata = getBlogMetadata(slug)
  const coverImageUrl = `/assets/${slug}/cover.png`

  return {
    title: postMetadata.title,
    description: postMetadata.description,
    openGraph: {
      title: postMetadata.title,
      description: postMetadata.description,
      type: 'article',
      url: `/blog/${slug}`,
      images: [
        {
          url: coverImageUrl ?? DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}

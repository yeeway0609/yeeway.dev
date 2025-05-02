import type { Metadata } from 'next'
import Image from 'next/image'
import { ScrollProgress } from '@/components/magicui/scroll-progress'
import { Badge } from '@/components/ui/badge'
import { getBlogMetadata, getAllBlogMetadata, getBlogToc } from '@/lib/mdx.utils'
import { TableOfContents } from './TableOfContents'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug
  const metadata = getBlogMetadata(slug)
  const toc = getBlogToc(slug)
  const { default: PostContent } = await import(`@/content/blog/${slug}.mdx`)
  const coverImageUrl = `/blog/${slug}/cover.png`

  return (
    <main className="mb-20 w-full">
      <ScrollProgress className="top-header h-[1.5px]" />

      <div className="layout-container flex items-start justify-evenly lg:gap-6">
        <div className="w-full max-w-3xl">
          <h1 className="mt-4 mb-2 text-3xl font-bold break-all sm:mt-8 sm:text-5xl sm:leading-tight sm:break-normal">{metadata.title}</h1>
          <p className="text-muted-foreground mb-3 text-sm sm:text-lg">{metadata.description}</p>
          <Image className="mb-4 w-full" src={coverImageUrl} alt="cover" width={600} height={315} priority />
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
  const postMetadata = getBlogMetadata(slug)
  const coverImageUrl = `/blog/${slug}/cover.png`

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

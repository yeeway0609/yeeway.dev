import fs from 'fs'
import path from 'path'
import type { Metadata } from 'next'
import { Badge } from '@/components/ui/badge'
import { getBlogFrontmatter } from '@/lib/mdx.utils'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug
  const frontmatter = getBlogFrontmatter(slug)
  const { default: PostContent } = await import(`@/content/blog/${slug}.mdx`)

  return (
    <main className="mx-auto max-w-screen-sm">
      <h1 className="my-4 text-3xl font-bold sm:my-8 sm:text-5xl">{frontmatter.title}</h1>
      <div className="flex">
        <time className="mr-4 text-lg text-muted-foreground">{frontmatter.publishedOn.toLocaleDateString('zh-TW')}</time>
        <ul>
          {frontmatter.labels.map((label) => (
            <Badge key={label} className="mr-2">
              #{label}
            </Badge>
          ))}
        </ul>
      </div>
      <hr className="mb-5 mt-2" />
      <article>
        <PostContent />
      </article>
    </main>
  )
}

export const dynamicParams = false // EXPLAIN: accessing a route not defined in generateStaticParams will get 404.

export function generateStaticParams() {
  const BLOG_DIR = 'src/content/blog'
  const files = fs.readdirSync(path.join(process.cwd(), BLOG_DIR))
  const mdxFiles = files.filter((file) => file.endsWith('.mdx'))

  return mdxFiles
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      const frontmatter = getBlogFrontmatter(slug)
      return frontmatter.isPublished ? { slug } : null
    })
    .filter(Boolean)
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const DEFAULT_OG_IMAGE = 'https://yeeway.dev/og.png'
  const slug = (await params).slug
  const frontmatter = getBlogFrontmatter(slug)

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      type: 'article',
      url: `https://yeeway.dev/blog/${slug}`,
      images: [
        {
          url: frontmatter.ogImageUrl ?? DEFAULT_OG_IMAGE,
        },
      ],
    },
  }
}

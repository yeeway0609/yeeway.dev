import type { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Badge } from '@/components/ui/badge'
import { getBlogPostMetadataBySlug, getBlogPostBySlug } from '@/lib/fetchers'
import { formatDate } from '@/lib/utils'

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params
  const post = await getBlogPostMetadataBySlug(params.slug)

  return {
    title: post.title,
    description: post.desc,
    openGraph: {
      title: post.title,
      description: post.desc,
      type: 'article',
      url: `https://yeeway.dev/blog/${post.slug}`,
      images: [
        {
          url: post.open_graph,
        },
      ],
    },
  }
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const post = await getBlogPostBySlug(params.slug)

  return (
    <main className="mx-auto max-w-screen-sm">
      <h1 className="my-4 text-3xl font-bold sm:my-8 sm:text-5xl">{post.title}</h1>
      <div className="flex">
        <span className="mr-4 text-lg text-muted-foreground">{formatDate(post.date)}</span>
        <div>
          {post.labels.map((label) => (
            <Badge key={label} className="mr-2">
              #{label}
            </Badge>
          ))}
        </div>
      </div>
      <hr className="mb-5 mt-2" />
      <ReactMarkdown remarkPlugins={[remarkGfm]} className="markdown">
        {post.body}
      </ReactMarkdown>
    </main>
  )
}

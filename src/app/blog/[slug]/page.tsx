import type { Metadata } from 'next'
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug)

  return {
    title: `${post.title} | yeeway.dev`,
    description: post.desc,
    openGraph: {
      title: `${post.title} | yeeway.dev`,
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

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getBlogPostBySlug } from '@/lib/fetchers'
import { formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
// import TableOfContents from './TableOfContents'
// import CommentCard from "@/components/CommentCard";

export const dynamic = 'force-dynamic' // disable data caching

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug)
  // const toc = post.body.match(/^##\s(.+)/gm)?.map(header => header.replace(/^##\s/, '')) || []

  return (
    <main className="mx-auto max-w-screen-sm">
      <h1 className="mb-2 mt-4 text-3xl font-bold sm:mb-4 sm:mt-8 sm:text-5xl">{post.title}</h1>
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
      {/* <div className="mb-4 mt-10 flex">
        <ChatBubbleOvalLeftEllipsisIcon className="mr-2 size-7" />
        <p className="text-lg text-muted-foreground">{post.comments?.totalCount} comments</p>
      </div> */}
      {/* <div className="flex flex-col gap-4">
        {post.comments?.nodes.map((comment: any, index: number) => (
          <CommentCard key={index} userName={comment.author.login} userAvatarUrl={comment.author.avatarUrl} content={comment.body} createdAt={comment.createdAt} />
        ))}
      </div> */}
    </main>
  )
}

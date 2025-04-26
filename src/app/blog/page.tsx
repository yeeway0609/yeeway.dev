import { BlogPostCard } from '@/components/BlogPostCard'
import { getAllBlogMetadata } from '@/lib/mdx.utils'
import type { BlogMetadata } from '@/lib/mdx.utils'

export default async function BlogPage() {
  const blogMetadata = getAllBlogMetadata()

  return (
    <div className="flex">
      <div className="w-full pt-8 sm:pt-12 md:w-2/3">
        <div className="flex w-full flex-col gap-6 sm:gap-10">
          {blogMetadata?.map((post: BlogMetadata) => <BlogPostCard key={post.slug} {...post} />)}
        </div>
      </div>
      <div className="hidden md:block md:w-1/3">{/* TODO: Add a search bar and a tag filter. */}</div>
    </div>
  )
}

import { BlogPostCard } from '@/components/BlogPostCard'
import { getAllBlogMetadata } from '@/lib/mdx.utils'
import type { BlogMetadata } from '@/lib/types'

export default async function Page() {
  const blogMetadata = getAllBlogMetadata()

  return (
    <main className="layout-container">
      <h1 className="page-title">Blog</h1>
      <h2 className="page-sub-title">My thoughts on coding, study notes, lifestyle, and other cool stuff.</h2>
      <div className="flex">
        <div className="w-full md:w-2/3">
          <div className="flex w-full flex-col gap-6 sm:gap-10">
            {blogMetadata?.map((post: BlogMetadata) => <BlogPostCard key={post.slug} {...post} />)}
          </div>
        </div>
        <div className="hidden md:block md:w-1/3">{/* TODO: Add a search bar and a tag filter. */}</div>
      </div>
    </main>
  )
}

import clsx from 'clsx'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { getAllBlogMetadata, getAllBlogTags } from '@/lib/mdx.utils'
import type { BlogMetadata } from '@/lib/types'
import { BlogPostCard } from './BlogPostCard'

export const metadata: Metadata = {
  title: '部落格',
}

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const dataList = getAllBlogMetadata()
  const tags = getAllBlogTags()
  const currentTag = (await searchParams).tag
  const filteredDataList = currentTag ? dataList.filter((post) => post.tags.includes(currentTag)) : dataList

  return (
    <main className="layout-container min-h-[calc(100vh-var(--spacing-header))] pb-20">
      <h1 className="page-title">部落格</h1>
      <p className="page-sub-title">記錄一些些學習筆記、生活瑣事或技術分享，佛系更新中</p>

      <div className="flex flex-col-reverse items-start justify-between gap-8 lg:flex-row lg:gap-16">
        <section className="flex w-full max-w-[640px] shrink-0 flex-col gap-6 sm:gap-10">
          {filteredDataList?.map((post: BlogMetadata) => <BlogPostCard key={post.slug} {...post} />)}
        </section>

        <aside className="w-full lg:max-w-[330px]">
          <h3 className="mb-3 text-lg leading-none font-medium tracking-wide">Tags:</h3>
          <div className="flex flex-wrap items-center justify-start gap-2">
            <Link href="/blog">
              <Badge className={clsx('font-medium hover:bg-primary', currentTag ? 'bg-muted-foreground' : 'bg-primary')}>
                All
              </Badge>
            </Link>
            {tags.map((tag) => (
              <Link key={tag} href={`/blog?tag=${tag}`}>
                <Badge className={clsx('font-medium hover:bg-primary', currentTag === tag ? 'bg-primary' : 'bg-muted-foreground')}>
                  #{tag}
                </Badge>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </main>
  )
}

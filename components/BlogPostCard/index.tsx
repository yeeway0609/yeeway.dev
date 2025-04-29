import { ArrowRightCircleIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import type { BlogMetadata } from '@/lib/mdx.utils'
import { Badge } from '@/components/ui/badge'

export function BlogPostCard({ slug, title, description, publishedOn, labels }: BlogMetadata) {
  return (
    <Link
      className="animate-arrow-shake bg-card text-card-foreground flex w-full max-w-[600px] cursor-pointer flex-col gap-2 rounded-lg border p-6 shadow-xs"
      title={`Post: ${title}`}
      href={`blog/${slug}`}
      scroll={false}
    >
      <h3 className="text-xl leading-tight font-semibold sm:text-2xl">{title}</h3>
      <p className="text-muted-foreground text-sm">{description.length > 100 ? `${description.substring(0, 100)}......` : description}</p>
      <div className="flex">
        {labels.map((label: any) => (
          <Badge key={label} className="mr-2 font-bold">
            #{label}
          </Badge>
        ))}
      </div>
      <div className="flex justify-between">
        <span>{publishedOn.toLocaleDateString('zh-TW')}</span>
        <div className="arrow-border flex items-center">
          <span className="text-primary">Read more</span>
          <ArrowRightCircleIcon className="arrow text-primary ml-2 size-5" />
        </div>
      </div>
    </Link>
  )
}

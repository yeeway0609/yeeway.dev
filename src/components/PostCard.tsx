import { ArrowRightCircleIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import type { BlogMetadata } from '@/lib/mdx.utils'

export function PostCard({ slug, title, description, publishedOn, labels }: BlogMetadata) {
  return (
    <Link
      className="hover:animate-arrow-shake flex w-full max-w-[600px] cursor-pointer flex-col gap-2 rounded-lg border bg-card p-6 text-card-foreground shadow-sm"
      title={`Post: ${title}`}
      href={`blog/${slug}`}
      scroll={false}
    >
      <h3 className="text-2xl font-semibold leading-tight">{title}</h3>
      <p className="text-sm text-muted-foreground">{description.length > 100 ? `${description.substring(0, 100)}......` : description}</p>
      <div className="flex">
        {labels.map((label: any) => (
          <Badge key={label} className="mr-2">
            #{label}
          </Badge>
        ))}
      </div>
      <div className="flex justify-between">
        <span>{publishedOn.toLocaleDateString('zh-TW')}</span>
        <div className="arrow-border flex items-center">
          <span className="text-primary">Read more</span>
          <ArrowRightCircleIcon className="arrow ml-2 size-5 text-primary" />
        </div>
      </div>
    </Link>
  )
}

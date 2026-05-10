import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { DEFAULT_COVER_IMAGE } from '@/lib/constants'
import type { BlogMetadata } from '@/lib/types'
import { formatDate } from '@/lib/utils'

export function BlogPostCard({ slug, title, description, publishedOn, tags, coverImageUrl }: BlogMetadata) {
  return (
    <Link
      className="@container flex min-h-48 w-full cursor-pointer flex-col overflow-clip rounded-lg border bg-card text-card-foreground shadow-xs transition-transform hover:scale-105 sm:flex-row"
      title={`Post: ${title}`}
      href={`blog/${slug}`}
    >
      <div className="w-full shrink-0 sm:max-w-80">
        <Image
          className="size-full max-h-[180px] animate-img-loading object-cover sm:max-h-none"
          src={coverImageUrl ?? DEFAULT_COVER_IMAGE}
          alt={`${title} - 封面`}
          width={300}
          height={200}
          priority
        />
      </div>

      <div className="flex w-full flex-col p-4 sm:p-5">
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <p className="mb-3 text-sm text-muted-foreground">
          {description.length > 100 ? `${description.substring(0, 100)}......` : description}
        </p>
        <div className="mt-auto flex items-center">
          <time className="mt-0.5">
            {formatDate(publishedOn)}
          </time>
          <span className="mx-2.5 text-[8px]">•</span>
          <div className="flex">
            {tags.map((tag) => (
              <Badge key={tag} className="mr-2 font-medium hover:bg-primary">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

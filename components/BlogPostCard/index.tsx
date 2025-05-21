import Image from 'next/image'
import Link from 'next/link'
import { ImageContainer } from '@/components/ImageContainer'
import { Badge } from '@/components/ui/badge'
import { DEFAULT_COVER_IMAGE } from '@/lib/constants'
import type { BlogData } from '@/lib/types'
import { formatDate } from '@/lib/utils'

export function BlogPostCard({ slug, title, description, publishedOn, tags, coverImageUrl }: BlogData) {
  return (
    <Link
      className="bg-card text-card-foreground @container flex min-h-48 w-full cursor-pointer flex-col overflow-clip rounded-lg border shadow-xs transition-transform hover:scale-105 sm:flex-row"
      href={`blog/${slug}`}
      title={`Post: ${title}`}
    >
      <ImageContainer className="w-full shrink-0 sm:max-w-72">
        <Image
          className="size-full max-h-48 object-cover"
          src={coverImageUrl ?? DEFAULT_COVER_IMAGE}
          alt={`${title} - 封面`}
          width={300}
          height={200}
          priority
        />
      </ImageContainer>

      <div className="flex w-full flex-col p-4 sm:p-5">
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground mb-3 text-sm">{description.length > 100 ? `${description.substring(0, 100)}......` : description}</p>
        <div className="mt-auto flex items-center">
          <time className="mt-0.5">{formatDate(publishedOn)}</time>
          <span className="mx-2.5 text-[8px]">•</span>
          <div className="flex">
            {tags.map((tag) => (
              <Badge key={tag} className="hover:bg-primary mr-2 font-medium">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

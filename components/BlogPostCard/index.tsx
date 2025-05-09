import Image from 'next/image'
import Link from 'next/link'
import { ImageContainer } from '@/components/ImageContainer'
import { Badge } from '@/components/ui/badge'
import type { BlogMetadata } from '@/lib/types'
import { formatDate } from '@/lib/utils'

export function BlogPostCard({ slug, title, description, publishedOn, labels, coverImageUrl }: BlogMetadata) {
  const defaultCoverImage = '/og.png'

  return (
    <Link
      className="bg-card text-card-foreground @container flex min-h-40 w-full max-w-[600px] cursor-pointer flex-col overflow-clip rounded-lg border shadow-xs transition-transform hover:scale-105 sm:flex-row"
      href={`blog/${slug}`}
      title={`Post: ${title}`}
    >
      <ImageContainer className="w-full shrink-0 sm:max-w-64">
        <Image
          className="size-full max-h-44 object-cover"
          src={coverImageUrl ?? defaultCoverImage}
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
            {labels.map((label: any) => (
              <Badge key={label} className="hover:bg-primary mr-2 font-medium">
                #{label}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

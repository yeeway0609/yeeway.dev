import { Icon } from '@iconify/react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Project } from '@/lib/types'

export function ProjectCard({
  title,
  description,
  tags,
  imageURL,
  responsibilities,
  websiteURL,
  websiteTitle,
  githubURL,
  githubTitle,
  articleURL,
  articleTitle,
}: Project) {
  return (
    <Card className="flex w-full max-w-80 flex-col gap-2 overflow-clip pt-0 sm:h-[450px] md:max-w-none">
      <div className="relative mb-3 aspect-5/3 h-[180px] shrink-0 overflow-clip rounded-t-lg object-cover">
        <Image
          className="size-full object-cover"
          src={imageURL}
          alt={title}
          width={300}
          height={180}
        />
      </div>
      <CardHeader className="px-4">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>
          <p>{description}</p>
          <p className="mt-1">參與部分：{responsibilities}</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-auto space-y-2 px-4 text-sm">
        {articleURL && (
          <div className="flex items-center gap-2 transition-colors duration-300">
            <Icon icon="tabler:book" className="size-5" />
            <Link
              className="cursor-pointer underline underline-offset-3 hover:text-primary"
              href={articleURL}
              target="_blank"
            >
              {articleTitle}
            </Link>
          </div>
        )}
        {githubURL && (
          <div className="flex items-center gap-2 transition-colors duration-300">
            <Icon className="size-5" icon="tabler:brand-github" />
            <Link
              className="-mt-0.5 cursor-pointer underline underline-offset-3 hover:text-primary"
              href={githubURL}
              target="_blank"
            >
              {githubTitle}
            </Link>
          </div>
        )}
        {websiteURL && (
          <div className="flex items-center gap-2 transition-colors duration-300">
            <Icon className="size-5" icon="bx:globe" />
            <Link
              className="-mt-1 cursor-pointer underline underline-offset-3 hover:text-primary"
              href={websiteURL}
              target="_blank"
            >
              {websiteTitle}
            </Link>
          </div>
        )}
      </CardContent>
      <CardFooter className="mt-4 flex-wrap gap-2 px-4">
        {tags?.map((tag) => (
          <Badge className="font-bold" key={tag}>
            {tag}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  )
}

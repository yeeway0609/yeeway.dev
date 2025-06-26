export type BlogData = {
  slug: string
  title: string
  description: string
  tags: string[]
  publishedOn: Date
  isPublished: boolean
  coverImageUrl: string | null
  content: string // HTML 字串
}

export type BlogMetadata = Omit<BlogData, 'content'>

export type Project = {
  title: string
  description: string
  imageURL: string
  responsibilities: string
  websiteURL: string | null
  websiteTitle: string | null
  githubURL: string | null
  githubTitle: string | null
  articleURL: string | null
  articleTitle: string | null
  tags: string[]
}

export type CarouselImage = {
  url: string
  title?: string
  width?: number
  height?: number
}

export type BlogTOC = {
  level: number
  heading: string
}[]

export type BlogMetadata = {
  slug: string
  title: string
  description: string
  tags: string[]
  publishedOn: Date
  isPublished: boolean
  coverImageUrl: string | null
}

export type Project = {
  title: string
  description: string
  imageURL: string
  websiteURL: string | null
  websiteTitle: string | null
  githubURL: string | null
  githubTitle: string | null
  blogURL: string | null
  blogTitle: string | null
  tags?: string[]
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

export type BlogMetadata = {
  slug: string
  title: string
  description: string
  labels: string[]
  publishedOn: Date
  isPublished: boolean
}

export type Project = {
  title: string
  description: string
  imageURL: string
  tags?: string[]
  websiteURL?: string
  githubURL?: string
  githubTitle?: string
  blogURL?: string
  blogTitle?: string
}

export type CarouselImage = {
  url: string
  title?: string
  width?: number
  height?: number
}

export type TableOfContents = {
  level: number
  heading: string
}[]

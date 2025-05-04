export type BlogMetadata = {
  slug: string
  title: string
  description: string
  labels: string[]
  publishedOn: Date
  isPublished: boolean
  coverImageUrl: string | null
}

// TODO: 專案的 metadata
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

export type BlogTOC = {
  level: number
  heading: string
}[]

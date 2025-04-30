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

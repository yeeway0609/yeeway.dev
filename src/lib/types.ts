export type BlogData = {
  slug: string
  title: string
  description: string // TODO: 這個欄位之後改為可選或是拔掉
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

export interface TmdbDetails {
  /** 映射到 LibraryItem 的 title */
  title: string
  /** 映射到 LibraryItem 的 externalUrl */
  url: string
  /** 映射到 LibraryItem 的 imageUrl */
  posterUrl: string | null
  /** 映射到 LibraryItem 的 releaseDate */
  releaseDate: string
}

export interface LibraryItem {
  id: string
  title: string
  type: string
  rating: number
  /** ISO 日曆日期字串（如 TMDB `2011-04-17`）；經 JSON 傳遞為字串 */
  releaseDate: string
  imageUrl: string | null
  externalUrl: string | null
}

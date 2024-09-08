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

export type BlogPostInfo = {
  slug: string
  title: string
  date: string
  labels: string[]
  desc: string
}

export type BlogPost = {
  slug: string
  title: string
  desc: string
  open_graph: string
  date: string
  labels: string[]
  body: string
}

export type BlogPostMetadata = Pick<BlogPost, 'slug' | 'title' | 'desc' | 'open_graph'>

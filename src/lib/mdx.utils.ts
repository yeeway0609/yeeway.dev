import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface BlogMetadata {
  slug: string
  title: string
  description: string
  labels: string[]
  publishedOn: Date
  isPublished: boolean
  ogImageUrl?: string
}

export function getBlogMetadata(slug: string): BlogMetadata {
  const filePath = path.join(process.cwd(), 'src/content/blog', `${slug}.mdx`)
  console.log(filePath)

  if (!fs.existsSync(filePath)) {
    throw new Error(`Blog post not found: ${slug}`)
  }

  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data } = matter(fileContent)

  return {
    slug,
    ...data,
  } as BlogMetadata
}

/** Only published blog posts will be generated */
export function getAllBlogMetadata(): BlogMetadata[] {
  const BLOG_DIR = 'src/content/blog'
  const files = fs.readdirSync(path.join(process.cwd(), BLOG_DIR))
  const mdxFiles = files.filter((file) => file.endsWith('.mdx'))

  return mdxFiles
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      const metadata = getBlogMetadata(slug)
      return metadata.isPublished ? metadata : null
    })
    .filter(Boolean) as BlogMetadata[]
}

// TODO: implement this function
export function getTableOfContents() {}

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { BlogMetadata } from '@/lib/types'

export function getBlogMetadata(slug: string): BlogMetadata {
  const filePath = path.join(process.cwd(), 'content/blog', `${slug}.mdx`)
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
  const BLOG_DIR = 'content/blog'
  const files = fs.readdirSync(path.join(process.cwd(), BLOG_DIR))
  const mdxFiles = files.filter((file) => file.endsWith('.mdx'))

  return mdxFiles
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      const metadata = getBlogMetadata(slug)
      return metadata.isPublished ? metadata : null
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b!.publishedOn).getTime() - new Date(a!.publishedOn).getTime()) as BlogMetadata[]
}

export function getRecentBlogMetadata(): BlogMetadata[] {
  const allBlogMetadata = getAllBlogMetadata()
  return allBlogMetadata.slice(0, 3)
}

// TODO: implement this function
export function getTableOfContents() {}

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { BlogMetadata, BlogTOC } from '@/lib/types'

const BLOG_DIR = 'content/blog'

function getFile(filePath: string): string {
  if (!fs.existsSync(filePath)) throw new Error(`File not found: ${filePath}`)
  return fs.readFileSync(filePath, 'utf8')
}

export function getBlogMetadata(slug: string): BlogMetadata {
  const filePath = path.join(process.cwd(), BLOG_DIR, `${slug}.mdx`)
  const fileContent = getFile(filePath)
  const { data } = matter(fileContent)

  return {
    slug,
    ...data,
  } as BlogMetadata
}

export function getAllBlogMetadata(): BlogMetadata[] {
  return fs
    .readdirSync(path.join(process.cwd(), BLOG_DIR))
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      const metadata = getBlogMetadata(slug)
      return metadata.isPublished ? metadata : null // EXPLAIN: Filter out unpublished posts
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b!.publishedOn).getTime() - new Date(a!.publishedOn).getTime()) as BlogMetadata[]
}

export function getAllBlogTags(): string[] {
  const allMetadata = getAllBlogMetadata()
  const allTags = allMetadata.flatMap((metadata) => metadata.tags)
  const uniqueTags = Array.from(new Set(allTags))
  return uniqueTags.sort((a, b) => a.localeCompare(b))
}

export function getRecentBlogMetadata(): BlogMetadata[] {
  return getAllBlogMetadata().slice(0, 3)
}

export function getBlogTOC(slug: string): BlogTOC {
  const filePath = path.join(process.cwd(), BLOG_DIR, `${slug}.mdx`)
  const fileContent = getFile(filePath)
  const headings: BlogTOC = []

  const lines = fileContent.split('\n')
  for (const line of lines) {
    const h2 = line.match(/^##\s+(.*)/)
    const h3 = line.match(/^###\s+(.*)/)

    if (h2) {
      headings.push({ level: 2, heading: h2[1] })
    } else if (h3) {
      headings.push({ level: 3, heading: h3[1] })
    }
  }

  return headings
}

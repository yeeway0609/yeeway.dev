import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface BlogFrontmatter {
  title: string
  description: string
  labels: string[]
  publishedOn: Date
  isPublished: boolean
  ogImageUrl?: string
}

export function getBlogFrontmatter(slug: string): BlogFrontmatter {
  const filePath = path.join(process.cwd(), 'src/content/blog', `${slug}.mdx`)
  console.log(filePath)

  if (!fs.existsSync(filePath)) {
    throw new Error(`Blog post not found: ${slug}`)
  }

  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data } = matter(fileContent)

  return data as BlogFrontmatter
}

// TODO: implement this function
export function getTableOfContents() {}

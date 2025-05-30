import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import rehypeStringify from 'rehype-stringify'
import { remark } from 'remark'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import { BlogData, BlogTOC } from '@/lib/types'

const BLOG_DIR = 'content/blog'

function getFile(filePath: string): string {
  if (!fs.existsSync(filePath)) throw new Error(`File not found: ${filePath}`)
  return fs.readFileSync(filePath, 'utf8')
}

export function getBlogData(slug: string): BlogData {
  const filePath = path.join(process.cwd(), BLOG_DIR, `${slug}.mdx`)
  const fileContent = getFile(filePath)
  const { data, content } = matter(fileContent)

  // EXPLAIN: 移除 MDX 中引入元件的 import path
  const removeImportsContent = content
    .split('\n')
    .filter((line) => !/^\s*(import)\s/.test(line))
    .join('\n')

  let contentHTML = remark()
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .processSync(removeImportsContent)
    .toString()

  // EXPLAIN: 處理 ![說明文字:寬x高] 格式的圖片
  contentHTML = contentHTML.replace(/<img([^>]+)alt="([^"]*?):(\d+)x(\d+)"([^>]*)>/g, (match, beforeAlt, altText, width, height, afterAlt) => {
    const altAttr = altText.trim() ? `alt="${altText.trim()}" ` : ''
    return `<img${beforeAlt} ${altAttr} width="${width}" height="${height}"${afterAlt}>`
  })

  return {
    slug,
    ...data,
    content: contentHTML,
  } as BlogData
}

export function getAllBlogData(): BlogData[] {
  return fs
    .readdirSync(path.join(process.cwd(), BLOG_DIR))
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      const data = getBlogData(slug)
      return data.isPublished ? data : null // EXPLAIN: Filter out unpublished posts
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b!.publishedOn).getTime() - new Date(a!.publishedOn).getTime()) as BlogData[]
}

export function getAllBlogTags(): string[] {
  const allData = getAllBlogData()
  const allTags = allData.flatMap((data) => data.tags)
  const uniqueTags = Array.from(new Set(allTags))
  return uniqueTags.sort((a, b) => a.localeCompare(b))
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

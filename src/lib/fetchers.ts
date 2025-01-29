'use server'

import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'
import { BlogPostInfo, BlogPost, BlogPostMetadata } from '@/lib/types'

const notion = new Client({ auth: process.env.NOTION_SECRET })
const NOTION_BLOG_DATABASE_ID = process.env.NOTION_BLOG_DATABASE_ID
const n2m = new NotionToMarkdown({ notionClient: notion })

export async function getBlogPostsInfo(): Promise<BlogPostInfo[]> {
  const data = await notion.databases.query({
    database_id: NOTION_BLOG_DATABASE_ID as string,
    filter: {
      property: 'published',
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: 'date',
        direction: 'descending',
      },
    ],
  })

  const infoList = data.results.map(
    (page: any) =>
      ({
        id: page.id,
        title: page.properties.title.title[0].plain_text,
        slug: page.properties.slug.rich_text[0].plain_text,
        labels: page.properties.labels.multi_select.map((label: any) => label.name),
        date: page.properties.date.date.start,
        desc: page.properties.desc.rich_text[0].plain_text,
      }) as BlogPostInfo
  )

  return infoList
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost> {
  const response = await notion.databases.query({
    database_id: NOTION_BLOG_DATABASE_ID as string,
    filter: {
      property: 'slug',
      rich_text: {
        equals: slug,
      },
    },
  })

  const page = response.results[0] as any
  const pageId = page.id
  const mdBlocks = await n2m.pageToMarkdown(pageId)
  const mdString = n2m.toMarkdownString(mdBlocks)

  const postdata = {
    title: page.properties.title.title[0].plain_text,
    slug: page.properties.slug.rich_text[0].plain_text,
    date: page.properties.date.date.start,
    labels: page.properties.labels.multi_select.map((label: any) => label.name),
    desc: page.properties.desc.rich_text[0].plain_text,
    body: mdString.parent,
    open_graph: page.properties.open_graph.files[0].file.url,
  }

  return postdata
}

export async function getBlogPostMetadataBySlug(slug: string): Promise<BlogPostMetadata> {
  const response = await notion.databases.query({
    database_id: NOTION_BLOG_DATABASE_ID as string,
    filter: {
      property: 'slug',
      rich_text: {
        equals: slug,
      },
    },
  })

  const page = response.results[0] as any

  const postdata = {
    title: page.properties.title.title[0].plain_text,
    slug: page.properties.slug.rich_text[0].plain_text,
    desc: page.properties.desc.rich_text[0].plain_text,
    open_graph: page.properties.open_graph.files[0].file.url,
  }

  return postdata
}

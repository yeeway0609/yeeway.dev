import { NextResponse } from 'next/server'
import { SITE_LINK, SITE_TITLE, SITE_DESCRIPTION, DEFAULT_COVER_IMAGE } from '@/lib/constants'
import { getAllBlogData } from '@/lib/mdx.utils'
import { BlogData } from '@/lib/types'

function buildRssXml(posts: BlogData[]): string {
  const blogPostsXml = posts
    .map(
      (post) => `
        <item>
          <title>${post.title}</title>
          <link>${SITE_LINK}/blog/${post.slug}</link>
          <guid isPermaLink="true">${SITE_LINK}/blog/${post.slug}</guid>
          <pubDate>${new Date(post.publishedOn).toUTCString()}</pubDate>
          <enclosure url="${post.coverImageUrl ? post.coverImageUrl : `${SITE_LINK}${DEFAULT_COVER_IMAGE}`}" type="image/png" />
          ${post.tags.map((tag) => `<category>${tag}</category>`).join('')}
          <description><![CDATA[ ${post.description} ]]></description>
          <content:encoded><![CDATA[ ${post.content} ]]></content:encoded>
        </item>
      `
    )
    .join('')

  return `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
      <channel>
        <title>${SITE_TITLE}</title>
        <link>${SITE_LINK}</link>
        <description>${SITE_DESCRIPTION}</description>
        <language>zh-TW</language>
        ${blogPostsXml}
        <follow_challenge>
          <feedId>148037044311473152</feedId>
          <userId>132393965393202176</userId>
        </follow_challenge>
      </channel>
    </rss>
  `
}

export async function GET() {
  try {
    const posts = getAllBlogData()
    const xml = buildRssXml(posts)

    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    })
  } catch (error) {
    console.error('[RSS_ROUTE_ERROR]: ', error)
    return new NextResponse('RSS feed error occurred', { status: 500 })
  }
}

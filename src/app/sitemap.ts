import { MetadataRoute } from 'next'
import { getAllBlogMetadata } from '@/lib/mdx.utils'
import type { BlogMetadata } from '@/lib/types'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogMetadata = getAllBlogMetadata()

  return [
    {
      url: 'https://yeeway.dev',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://yeeway.dev/projects',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://yeeway.dev/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://yeeway.dev/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...blogMetadata.map((post: BlogMetadata) => ({
      url: `https://yeeway.dev/blog/${post.slug}`,
      lastModified: new Date(post.publishedOn),
      priority: 1,
    })),
    {
      url: 'https://yeeway.dev/feed.xml',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://yeeway.dev/uses',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
}

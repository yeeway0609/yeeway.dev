import { MetadataRoute } from 'next'
import { getBlogPostsInfo } from '@/lib/fetchers'
import { BlogPostInfo } from '@/lib/types'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPostsInfo = await getBlogPostsInfo()

  return [
    {
      url: 'https://yeeway.dev',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://yeeway.dev/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://yeeway.dev/projects',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // {
    //   url: 'https://yeeway.dev/blog',
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 0.5,
    // },
    ...blogPostsInfo.map((post: BlogPostInfo) => ({
      url: `https://yeeway.dev/blog/${post.slug}`,
      lastModified: new Date(post.date),
      priority: 0.2,
    })),
  ]
}

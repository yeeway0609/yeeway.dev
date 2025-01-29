import { NextResponse } from 'next/server'
import { getBlogPostBySlug } from '@/lib/fetchers'

export async function GET(request: Request, props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const blogPost = await getBlogPostBySlug(params.slug)

  return NextResponse.json(blogPost)
}

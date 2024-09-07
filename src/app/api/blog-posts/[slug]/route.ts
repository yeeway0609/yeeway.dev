import { NextResponse } from 'next/server'
import { getBlogPostBySlug } from '@/lib/fetchers'

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const blogPost = await getBlogPostBySlug(params.slug)

  return NextResponse.json(blogPost)
}

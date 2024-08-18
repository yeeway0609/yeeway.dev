import { NextResponse } from 'next/server'
import { getBlogPostsInfo } from '@/lib/fetchers'

export async function GET() {
  const blogPostsInfo = await getBlogPostsInfo()

  return NextResponse.json(blogPostsInfo)
}
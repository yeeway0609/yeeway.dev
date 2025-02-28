import Image from 'next/image'
import smilingFaceImg from '@/assets/smiling_face_with_sunglasses_3d.png'
import { BlogPostCard } from '@/components/BlogPostCard'
import { getAllBlogMetadata } from '@/lib/mdx.utils'
import type { BlogMetadata } from '@/lib/mdx.utils'

export default async function BlogPage() {
  const blogMetadata = getAllBlogMetadata()

  return (
    <div className="flex">
      <div className="w-full md:w-2/3">
        <section className="py-8 sm:py-12">
          <h1 className="animate-slide-in-right inline-block text-5xl font-black tracking-wider">
            Hi, I&apos;m <span className="name-gradient">Yiwei Su</span>.
            <Image className="mb-2 inline" width={48} height={48} alt="emoji_smiling_face_with_sunglasses" src={smilingFaceImg}></Image>
          </h1>
          <h2 className="animate-slide-in-right text-muted-foreground mt-3 text-xl delay-100 sm:text-2xl">
            Being creative. Being Positive. Being Motivated.
          </h2>
        </section>
        <div className="animate-slide-in-right flex w-full flex-col gap-6 delay-200 sm:gap-10">
          {blogMetadata?.map((post: BlogMetadata) => <BlogPostCard key={post.slug} {...post} />)}
        </div>
      </div>
      <div className="hidden md:block md:w-1/3">{/* TODO: Add a search bar and a tag filter. */}</div>
    </div>
  )
}

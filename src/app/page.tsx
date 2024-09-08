import Image from 'next/image'
import { getBlogPostsInfo } from '@/lib/fetchers'
import PostCard from '@/components/PostCard'

export default async function BlogPage() {
  const blogPostsInfo = await getBlogPostsInfo()

  return (
    <div className="flex">
      <div className="w-full md:w-2/3">
        <section className="py-8 sm:py-12">
          <h1 className="animate-slide-in-right inline-block text-5xl font-black tracking-wider">
            Hi, I&apos;m <span className="name-gradient">Alex Su</span>.
            <Image
              className="mb-2 inline"
              width={48}
              height={48}
              alt="emoji_smiling_face_with_sunglasses"
              src="/smiling_face_with_sunglasses_3d.png"
            ></Image>
          </h1>
          <h2 className="animate-slide-in-right mt-3 text-xl text-muted-foreground delay-100 sm:text-2xl">
            Being creative. Being Positive. Being Motivated.
          </h2>
        </section>
        <div className="animate-slide-in-right flex w-full flex-col gap-6 delay-200 sm:gap-10">
          {blogPostsInfo?.map((post: any) => {
            return <PostCard key={post.id} slug={post.slug} title={post.title} date={post.date} labels={post.labels} desc={post.desc} />
          })}
        </div>
      </div>
      <div className="hidden md:block md:w-1/3">{/* TODO: Add a search bar and a tag filter. */}</div>
    </div>
  )
}

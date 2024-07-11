import { Metadata } from "next";
import Image from "next/image";
import { getPosts } from "@/lib/fetchers";
import LoadPosts from "./LoadPosts";
import AddPostBtn from "@/components/AddPostBtn";

export const dynamic = "force-dynamic"; // disable data caching

export const metadata: Metadata = {
  title: "Blog | yeeway.dev",
};

export default async function BlogPage() {
  const posts = await getPosts(null);
  const endCursor = posts.pageInfo.endCursor;

  return (
    <div className="flex">
      <div className="w-full md:w-2/3">
        <section className="py-8 sm:py-12">
          <h1 className="animate-slide-in-right inline-block text-5xl font-black tracking-wider">
            Hi, I&apos;m <span className="name-gradient">Alex Su</span>.
            <Image className="mb-2 inline" width={48} height={48} alt="emoji_smiling_face_with_sunglasses" src="/smiling_face_with_sunglasses_3d.png"></Image>
          </h1>
          <h2 className="animate-slide-in-right mt-3 text-xl text-muted-foreground delay-100 sm:text-2xl">
            Being creative. Being Positive. Being Motivated.
          </h2>
        </section>
        <AddPostBtn />
        <div className="animate-slide-in-right flex w-full flex-col gap-6 delay-200 sm:gap-10">
          <LoadPosts initialPosts={posts.nodes} initialEndCursor={endCursor} />
        </div>
      </div>
      <div className="hidden md:block md:w-1/3">
        {/* TODO: Add a search bar and a tag filter. */}
      </div>
    </div>
  );
}

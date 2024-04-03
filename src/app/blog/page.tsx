import { getPosts } from "@/lib/fetchers";
import LoadPosts from "./LoadPosts";
import AddPostBtn from "@/components/AddPostBtn";

export const dynamic = "force-dynamic"; // disable data caching

export default async function BlogPage() {
  const posts = await getPosts(null);
  const endCursor = posts.pageInfo.endCursor;

  return (
    <div>
      <AddPostBtn />
      <div className="flex w-full flex-col items-center gap-10">
        <LoadPosts initialPosts={posts.nodes} initialEndCursor={endCursor} />
      </div>
    </div>
  );
}

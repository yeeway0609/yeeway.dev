import GitHubLogInBtn from "@/components/GitHubLogInBtn";
import { getPosts } from "@/lib/fetchers";
import LoadPosts from "./LoadPosts";

export default async function BlogPage() {
  const posts = await getPosts(null);
  const endCursor = posts.pageInfo.endCursor;

  return (
    <div className="flex w-full flex-col items-center gap-10">
      <LoadPosts initialPosts={posts.nodes} initialEndCursor={endCursor} />
    </div>
  );
}

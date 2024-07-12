import type { Metadata } from "next";
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const postData = await getBlogPostBySlug(params.slug);

  return {
    title: `${postData.title} | yeeway.dev`,
  };
}

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getBlogPostBySlug } from "@/lib/fetchers";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
// import CommentCard from "@/components/CommentCard";
// import EditPostBtn from "@/components/EditPostBtn";

export const dynamic = "force-dynamic"; // disable data caching

export default async function Page({ params }: { params: { slug: string } }) {
  const postData = await getBlogPostBySlug(params.slug);

  return (
    <div>
      <h1 className="mb-2 mt-4 text-3xl font-bold sm:mb-4 sm:mt-8 sm:text-5xl">
        {postData.title}
      </h1>
      <div className="flex">
        <span className="mr-4 text-lg text-muted-foreground">{formatDate(postData.date)}</span>
        <div>
          {postData.labels.map((label) => (
            <Badge key={label} className="mr-2">#{label}</Badge>
          ))}
        </div>
      </div>
      <hr className="mb-5 mt-2" />
      <ReactMarkdown remarkPlugins={[remarkGfm]} className="markdown">{postData.body}</ReactMarkdown>
      {/* <div className="mb-4 mt-10 flex">
        <ChatBubbleOvalLeftEllipsisIcon className="mr-2 size-7" />
        <p className="text-lg text-muted-foreground">{postData.comments?.totalCount} comments</p>
      </div> */}
      {/* <div className="flex flex-col gap-4">
        {postData.comments?.nodes.map((comment: any, index: number) => (
          <CommentCard key={index} userName={comment.author.login} userAvatarUrl={comment.author.avatarUrl} content={comment.body} createdAt={comment.createdAt} />
        ))}
      </div> */}
    </div>
  );
}

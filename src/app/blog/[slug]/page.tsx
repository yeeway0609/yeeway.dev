import { NextSeo } from "next-seo";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";
import { getPostData } from "@/lib/fetchers";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import CommentCard from "@/components/CommentCard";
import EditPostBtn from "@/components/EditPostBtn";

export const dynamic = "force-dynamic"; // disable data caching

export default async function PostPage({ params }: { params: { slug: number } }) {
  const issueNumber = params.slug;
  const postData = await getPostData(issueNumber);

  return (
    <div>
      <div className="mt-2 flex">
        {postData.labels?.nodes.map((label) => (
          <Badge key={label.name} className="mr-2">#{label.name}</Badge>
        ))}
      </div>
      <h1 className="my-4 text-3xl font-bold sm:my-8 sm:text-5xl">
        {postData.title}
      </h1>
      <div className="flex justify-between">
        <span className="text-lg text-muted-foreground">{formatDate(postData.createdAt)}</span>
        <EditPostBtn issueNumber={issueNumber} issueId={postData.id!} initialTitle={postData.title} initialContent={postData.body} />
      </div>
      <hr className="mb-5 mt-2" />
      <ReactMarkdown remarkPlugins={[remarkGfm]} className="markdown">{postData.body}</ReactMarkdown>

      <div className="mb-4 mt-10 flex">
        <ChatBubbleOvalLeftEllipsisIcon className="mr-2 size-7" />
        <p className="text-lg text-muted-foreground">{postData.comments?.totalCount} comments</p>
      </div>
      <div className="mb-10 flex flex-col gap-4">
        {postData.comments?.nodes.map((comment: any, index: number) => (
          <CommentCard key={index} userName={comment.author.login} userAvatarUrl={comment.author.avatarUrl} content={comment.body} createdAt={comment.createdAt} />
        ))}
      </div>
    </div>
  );
}

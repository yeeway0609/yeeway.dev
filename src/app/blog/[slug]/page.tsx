import { NextSeo } from "next-seo";
import { getPostData } from "@/lib/fetchers";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import GitHubLogInBtn from "@/components/GitHubLogInBtn";
import CommentCard from "@/components/CommentCard";

export default async function PostPage({ params }: { params: { slug: number } }) {
  const issueNumber = params.slug;
  const postData = await getPostData(issueNumber);

  return (
    <div>
      <GitHubLogInBtn />
      <ReactMarkdown remarkPlugins={[remarkGfm]} className="markdown">{postData.body}</ReactMarkdown>

      <h1 className="text-xl">留言區</h1>
      <div className="flex flex-col gap-2">
        {postData.comments?.nodes.map((comment: any, index: number) => (
          <CommentCard key={index} userName={comment.author.login} userAvatarUrl={comment.author.avatarUrl} content={comment.body} />
        ))}
      </div>
    </div>
  );
}

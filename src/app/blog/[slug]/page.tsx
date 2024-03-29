import { NextSeo } from 'next-seo';
import { getPostData } from "@/lib/fetchers";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default async function PostPage({ params }: { params: { slug: number } }) {
  const issueNumber = params.slug;
  const postData = await getPostData(issueNumber);

  return (
    <div>
      <ReactMarkdown remarkPlugins={[remarkGfm]} className="markdown">{postData.body}</ReactMarkdown>
      {/* {postData.comments && postData.comments.nodes.map((comment: any) => (
        <div key={comment.author.login}>
          <h2>{comment.author.login}</h2>
          <p>{comment.body}</p>
        </div>
      ))} */}
    </div>
  );
}

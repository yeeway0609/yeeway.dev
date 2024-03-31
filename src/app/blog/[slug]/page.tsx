import { NextSeo } from 'next-seo';
import { getPostData } from "@/lib/fetchers";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import GitHubLogInBtn from '@/components/GitHubLogInBtn';
import Comments from '@/components/Comments';

export default async function PostPage({ params }: { params: { slug: number } }) {
  const issueNumber = params.slug;
  const postData = await getPostData(issueNumber);

  return (
    <div>
      <GitHubLogInBtn />
      <ReactMarkdown remarkPlugins={[remarkGfm]} className="markdown">{postData.body}</ReactMarkdown>

      <Comments />
      {/* {postData.comments && postData.comments.nodes.map((comment: any) => (
        <div key={comment.author.login}>
          <h2>{comment.author.login}</h2>
          <p>{comment.body}</p>
        </div>
      ))} */}
    </div>
  );
}

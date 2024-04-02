import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CommentCard({userName, userAvatarUrl, content}: {userName: string, userAvatarUrl: string, content: string}) {
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>{userName}</CardTitle>
        <Avatar>
          <AvatarImage src={userAvatarUrl} />
        </Avatar>
      </CardHeader>
      <CardContent>
        <ReactMarkdown remarkPlugins={[remarkGfm]} className="markdown">{content}</ReactMarkdown>
      </CardContent>
    </Card>
  );
}
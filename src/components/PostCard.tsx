import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Issue } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function PostCard({ title, body, number, createdAt, labels }: Issue) {
  return (
    <Card className="w-96">
      <Link href={`blog/${number}`}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{body}</CardDescription>
          <CardDescription>
            {labels?.nodes.map((label) => (
              <Badge key={label.name} className="mr-1">{label.name}</Badge>
            ))}
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-between">
          <p>{formatDate(createdAt)}</p>
          <p className="text-primary">Read more</p>
        </CardFooter>
      </Link>
    </Card>
  );
};
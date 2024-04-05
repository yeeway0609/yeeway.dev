import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import { Issue } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function PostCard({ title, body, number, createdAt, labels }: Issue) {
  return (
    <Link
      title={`Post: ${title}`}
      href={`blog/${number}`}
      className="hover:animate-arrow-shake flex w-full max-w-[600px] flex-col gap-2 rounded-lg border bg-card p-6 text-card-foreground shadow-sm"
    >
      <h3 className="text-2xl font-semibold leading-tight">{title}</h3>
      <p className="text-sm text-muted-foreground">{body.substring(0, 100)}......</p>
      <div className="flex">
        {labels?.nodes.map((label) => (
          <Badge key={label.name} className="mr-1">#{label.name}</Badge>
        ))}
      </div>
      <div className="flex justify-between">
        <span>{formatDate(createdAt)}</span>
        <div className="flex items-center">
          <span className="text-primary">Read more</span>
          <ArrowRightCircleIcon className="arrow ml-2 size-5 text-primary" />
        </div>
      </div>
    </Link>
  );
};
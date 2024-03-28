import { Issue } from "@/lib/types";
import Link from "next/link";

export default function PostCard({ title, body, number }: Issue) {
  return (
    <div className="w-96 rounded-lg bg-white px-8 py-4 shadow-lg">
      <div>
        <h2 className="text-3xl font-semibold text-gray-800">{title}</h2>
        <p className="mt-2 text-gray-600">{body}</p>
      </div>
      <div className="mt-4 flex justify-end">
        <Link href={`blog/${number}`}>
          <span className="text-xl font-medium text-indigo-500">閱讀更多</span>
        </Link>
      </div>
    </div>
  );
};
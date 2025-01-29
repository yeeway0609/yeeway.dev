import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { formatDate } from '@/lib/utils'

export function CommentCard({
  userName,
  userAvatarUrl,
  content,
  createdAt,
}: {
  userName: string
  userAvatarUrl: string
  content: string
  createdAt: string
}) {
  return (
    // TODO: Add a comment card here
    <div className="rounded-[10px] border border-border">
      <div className="flex items-center rounded-t-[10px] border-b border-border bg-slate-400 px-4 py-3 dark:bg-slate-900">
        <Avatar className="mr-2 size-6">
          <AvatarImage src={userAvatarUrl} />
        </Avatar>
        <p>
          <span className="font-bold">{userName}</span> commented on {formatDate(createdAt)}
        </p>
      </div>
      <div className="rounded-b-[10px] bg-gray-200 px-4 py-3 dark:bg-gray-700">
        <p>{content}</p>
      </div>
    </div>
  )
}

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { signIn, signOut, useSession } from "next-auth/react";

export default function LogInAvatar() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <Avatar onClick={() => signOut()} className="size-8 cursor-pointer">
        <AvatarImage src={session.user!.image!} />
      </Avatar>
    );
  } else {
    return (
      <Avatar onClick={() => signIn("github")} className="size-8 cursor-pointer">
        <AvatarImage src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" />
      </Avatar>
    );
  };

}
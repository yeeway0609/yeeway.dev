'use client';
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

export default function GitHubLogInBtn() {
  const { data: session } = useSession();

  if (session != null) {
    return <Button onClick={() => signOut()}>Log out with Github </Button>;
  } else {
    return <Button onClick={() => signIn("github")}>Log in with Github </Button>;
  };
}
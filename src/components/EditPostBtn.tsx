"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { updatePostTitle, updatePostContent } from "@/lib/actions";

export default function EditPostBtn({ issueNumber, issueId, initialTitle, initialContent }: { issueNumber: number, issueId: string, initialTitle: string, initialContent: string}) {
  const { data: session } = useSession();
  const [newTitle, setNewTitle] = useState(initialTitle);
  const [newContent, setNewContent] = useState(initialContent);
  const router = useRouter();

  const handleTitleChange = (e: any) => {
    setNewTitle(e.target.value);
  };

  const handleContentChange = (e: any) => {
    setNewContent(e.target.value);
  };

  const handleSubmit = (e: any) => {
    updatePostTitle(issueId, newTitle);
    updatePostContent(issueId, newContent);
    router.push(`/blog/${issueNumber}`);
    router.refresh();
    location.reload();
    console.log("Post updated!");
  };

  if (session?.user?.name === "蘇奕幃 Alex Su" || session?.user?.name === "test039274") {
    return (
      <Dialog>
        <DialogTrigger>
          <PencilSquareIcon className="size-6 text-muted-foreground" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit your post...</DialogTitle>
          </DialogHeader>
          <p>Title:</p>
          <Input type="text" value={newTitle} onChange={handleTitleChange} className="rounded-none" />
          <p>Content:</p>
          <Textarea value={newContent} onChange={handleContentChange} className="h-60 rounded-none" />
          <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            {(session?.user?.name === "蘇奕幃 Alex Su") ? (
              <Button type="button" variant="secondary" onClick={handleSubmit}>Update</Button>
            ) : (
              <Button disabled>Disabled</Button>
            )}
          </DialogClose>
        </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  } else {
    return (
      <></>
    );
  };
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { createPost } from "@/lib/actions";

export default function AddPostBtn() {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: any) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e: any) => {
    if (title !== "" && content !== "") {
      createPost(title, content);
      router.refresh();
      location.reload();
      console.log("Post created!");
    } else {
      alert("Please fill in the title and content!");
    }
  };

  if (session?.user?.name === "蘇奕幃 Alex Su" || session?.user?.name === "test039274") {
    return (
      <div className="mb-5 flex items-center">
        <span>Add new post ...</span>
        <Dialog>
          <DialogTrigger>
            <PlusCircleIcon className="size-6 cursor-pointer" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create your post...</DialogTitle>
            </DialogHeader>
            <p>Title:</p>
            <Input type="text" value={title} onChange={handleTitleChange} className="rounded-none" />
            <p>Content:</p>
            <Textarea value={content} onChange={handleContentChange} className="h-60 rounded-none" />
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
      </div>
    );
  } else {
    return (
      <></>
    );
  };
}
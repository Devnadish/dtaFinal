"use client";

import { useActionState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { addCommentToAnswer } from "../actions/addComment";
import { Icon } from "@iconify/react";
import { toast } from "sonner";

interface CommentFormProps {
  answerId: string;
  userEmail: string;
  slug: string;
}
function CommentForm({ answerId, userEmail, slug }: CommentFormProps) {
  const [state, action, isPending] = useActionState(addCommentToAnswer, {
    success: "",
    error: undefined,
  });
  console.log(userEmail);
  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state]);
  return (
    <form action={action} className="flex flex-row gap-2 w-full">
      <Input
        type="text"
        name="content"
        placeholder="Add a comment"
        className={cn(
          "bg-background/50 hover:bg-background/70",
          "border-border/20",
          "placeholder:text-muted-foreground/50",
          "transition-all duration-200",
          "focus:ring-2 focus:ring-purple-500/20"
        )}
      />
      <Input type="hidden" name="useremail" defaultValue={userEmail} />
      <Input type="hidden" name="answerId" defaultValue={answerId} />
      <Input type="hidden" name="slug" defaultValue={slug} />

      <Button type="submit" variant="outline" disabled={isPending}>
        {isPending ? (
          <Icon icon="svg-spinners:180-ring" className="animate-spin" /> // Loading spinner icon
        ) : (
          <Icon icon="mdi:send" /> // Submit icon (e.g., a send icon)
        )}
      </Button>
    </form>
  );
  //  await addCommentToAnswer(answerId, userEmail, comment as string, slug);
}

export default CommentForm;

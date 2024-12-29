"use client";
import { addCommentToAnswer } from "@/actions/faq/addComment";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UserInformation from "@/components/UserInformaton";
import { Answer } from "@/type/types";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

// Types
interface CommentFormProps {
  answerId: string;
  userEmail: string;
  slug: string;
}

interface CommentsProps {
  answerId: string;
  userEmail: string;
  item: Answer;
  slug: string;
}

interface ImageAvatarProps {
  userImage: string;
  email: string;
}

function CommentForm({ answerId, userEmail, slug }: CommentFormProps) {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function CreateComment(formData: FormData) {
    try {
      setIsSubmitting(true);
      const comment = formData.get("comment");
      await addCommentToAnswer(
        answerId,
        userEmail,
        comment as string,
        slug
      );
      setNewComment("");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form 
      action={CreateComment} 
      className="flex flex-row gap-2"
    >
      <Input
        type="text"
        value={newComment}
        name="comment"
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment"
        className={cn(
          "bg-background/50 hover:bg-background/70",
          "border-border/20",
          "placeholder:text-muted-foreground/50",
          "transition-all duration-200",
          "focus:ring-2 focus:ring-purple-500/20",
          "rounded-xl"
        )}
      />
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          type="submit" 
          variant="outline"
          disabled={isSubmitting || !newComment.trim()}
          className={cn(
            "rounded-xl p-2",
            "bg-gradient-to-r from-purple-500/10 to-blue-500/10",
            "hover:from-purple-500/20 hover:to-blue-500/20",
            "border border-purple-500/20",
            "transition-all duration-300",
            "disabled:opacity-50"
          )}
        >
          <Icon 
            icon={isSubmitting ? "solar:loading-bold-duotone" : "solar:paper-plane-bold"} 
            className={cn(
              "w-5 h-5 text-purple-500",
              isSubmitting && "animate-spin"
            )}
          />
        </Button>
      </motion.div>
    </form>
  );
}

function Comments({ answerId, userEmail, item, slug }: CommentsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col gap-3">
      <motion.div 
        className="flex flex-row items-center gap-2 w-full justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          className={cn(
            "text-purple-500 hover:text-purple-600",
            "bg-gradient-to-r from-purple-500/10 to-blue-500/10",
            "hover:from-purple-500/20 hover:to-blue-500/20",
            "border border-purple-500/20",
            "rounded-xl",
            "transition-all duration-300",
            "flex items-center gap-2"
          )}
          onClick={toggleExpanded}
        >
          <span>{isExpanded ? 'Hide Comments' : 'Add And Show Comments'}</span>
          <Icon 
            icon={isExpanded ? "solar:alt-arrow-up-bold" : "solar:alt-arrow-down-bold"} 
            className="w-5 h-5"
          />
        </Button>
        <div className="flex flex-row items-center gap-2 px-3 py-1 rounded-full bg-background/30 border border-border/20">
          <Icon icon="solar:chat-square-like-bold" className="w-4 h-4 text-purple-500" />
          <p className="text-xs text-muted-foreground font-medium">
            {item.comments.length}
          </p>
        </div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "w-full",
              "bg-gradient-to-br from-background/30 to-background/10",
              "backdrop-blur-md",
              "p-4 rounded-xl",
              "border border-border/20",
              "flex flex-col gap-3",
              "shadow-lg shadow-purple-500/5"
            )}
          >
            <CommentForm answerId={answerId} userEmail={userEmail} slug={slug} />

            <motion.ul 
              className="flex flex-col gap-3"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {item.comments.map((comment) => (
                <motion.li
                  key={comment.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className={cn(
                    "flex flex-row items-start gap-3 p-3",
                    "rounded-xl",
                    "bg-background/50",
                    "border border-border/10",
                    "hover:bg-background/70",
                    "transition-all duration-200"
                  )}
                >
                  <ImageAvatar
                    userImage={comment.userImage || ""}
                    email={comment.userEmail || ""}
                  />
                  <div className="flex flex-col gap-2">
                    <UserInformation email={comment.userEmail || ""} />
                    <p className="text-sm text-muted-foreground/90">{comment.content}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ImageAvatar({ userImage, email }: ImageAvatarProps) {
  return (
    <Avatar className={cn(
      "w-8 h-8",
      "ring-2 ring-purple-500/20",
      "bg-gradient-to-br from-purple-500/10 to-blue-500/10"
    )}>
      <AvatarImage src={userImage} />
      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white">
        {email[0]?.toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}

export default Comments;
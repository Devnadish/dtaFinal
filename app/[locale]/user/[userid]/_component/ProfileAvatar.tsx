'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

interface ProfileAvatarProps {
  src?: string | null;
  name?: string | null;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ src, name }) => {
  const fallbackInitial = React.useMemo(() => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  }, [name]);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/30 rounded-full blur-2xl" />
      <Avatar className={cn(
        "w-28 h-28 ring-4 ring-background",
        "shadow-xl hover:shadow-2xl",
        "transition-all duration-300",
        "relative"
      )}>
        <AvatarImage 
          src={src ?? undefined} 
          alt={name ?? "User Avatar"} 
          className="object-cover"
        />
        <AvatarFallback className="bg-primary/5 text-2xl font-semibold">
          {fallbackInitial}
        </AvatarFallback>
      </Avatar>
    </motion.div>
  );
};

export default ProfileAvatar;
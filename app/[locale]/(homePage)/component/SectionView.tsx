"use client";

import SectionTitle from "./SectionTitle";
import React, { useState, memo } from "react";
import PostList from "./PostList";
import { SectionViewProps } from "@/constant/type";
import { motion } from "framer-motion";
import ExpandButton from "./ExpandButton";

const SectionView = memo(({ posts, title, icon, locale }: SectionViewProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayedPosts = isExpanded ? posts : posts.slice(0, 3);
  const toggleExpand = () => setIsExpanded((prev) => !prev);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col w-full space-y-6 transition-all duration-300 ease-in-out"
    >
      <motion.div
        className="flex flex-row items-center justify-between w-full bg-secondary/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/20 hover:bg-secondary/95"
        whileHover={{ scale: 1.01 }}
      >
        <SectionTitle title={title} icon={icon} locale={locale} />
        <ExpandButton isExpanded={isExpanded} onClick={toggleExpand} />
      </motion.div>
      <motion.div
        layout
        className={`transition-all duration-500 ease-in-out ${isExpanded ? 'opacity-100 transform translate-y-0' : 'opacity-95'
          }`}
      >
        <PostList posts={displayedPosts} isExpanded={isExpanded} />
      </motion.div>
    </motion.div>
  );
});

export default SectionView;
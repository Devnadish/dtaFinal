
import React, { memo } from "react";
import PostList from "./PostList";
import { blogSectionViewProps, SectionViewProps } from "@/constant/type";
import Motion from "./Motion";
import { ExtendedPost } from "@/type/types";




const SectionView = ({ posts }: SectionViewProps) => {
  return (
    <Motion>
      <PostList posts={posts as ExtendedPost[]} />
    </Motion>
  );
};


export default SectionView;
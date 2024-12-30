
import React, {  memo } from "react";
import PostList from "./PostList";
import { blogSectionViewProps } from "@/constant/type";
import Motion from "./Motion";

const SectionView = ({ posts,  locale }: blogSectionViewProps) => {

  return (
    <Motion>
      <PostList posts={posts} isExpanded={true} />
    </Motion>
  );
};

export default SectionView;
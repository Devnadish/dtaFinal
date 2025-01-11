"use client";
import React from "react";
import { Icon } from "@iconify/react";

const CommentItemActions = () => {
  // State for like and dislike counters
  const [likeCount, setLikeCount] = React.useState(0);
  const [dislikeCount, setDislikeCount] = React.useState(0);

  return (
    <div className="w-full flex items-center justify-between p-2">
      <div className="flex items-center gap-2 ">
        {/* Like Button and Counter */}
        <button
          onClick={() => setLikeCount(likeCount + 1)}
          className="flex items-center gap-1 text-xs"
        >
          <Icon icon="mdi:thumb-up-outline" width="20" height="20" />
          <span>{likeCount}</span>
        </button>

        {/* Dislike Button and Counter */}
        <button
          onClick={() => setDislikeCount(dislikeCount + 1)}
          className="flex items-center gap-1 text-xs"
        >
          <Icon icon="mdi:thumb-down-outline" width="20" height="20" />
          <span>{dislikeCount}</span>
        </button>
      </div>

      {/* Report Button */}
      <div className="flex items-center gap-1 text-xs">
        <Icon icon="mdi:alert-circle-outline" width="20" height="20" />
        <span>Report</span>
      </div>
    </div>
  );
};

export default CommentItemActions;

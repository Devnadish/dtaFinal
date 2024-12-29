import { AnimatePresence, motion } from "framer-motion";
import PostCard from "./PostCard";
import { Post } from "@/sanity.types";

type PostListProps = {
  posts: Post[];
  isExpanded: boolean;
};

const PostList = ({ posts, isExpanded }: PostListProps) => {
  const displayedPosts = isExpanded ? posts : posts.slice(0, 3);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-4 gap-6 justify-items-center w-full px-4">
      <AnimatePresence mode="popLayout">
        {displayedPosts.map((post, index) => (
          <motion.div
            key={post._id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: index * 0.1 }
            }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{ scale: 1.02 }}
            className="w-full transform transition-all duration-300 hover:translate-y-[-5px]"
          >
            <PostCard post={post} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default PostList;
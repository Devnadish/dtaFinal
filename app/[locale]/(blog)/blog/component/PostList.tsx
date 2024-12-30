import PostCard from "./PostCard";
import { Post } from "@/sanity.types";
import PopLayout from "./PopLayout";

type PostListProps = {
  posts: Post[];
  isExpanded: boolean;
};

const PostList = ({ posts, isExpanded }: PostListProps) => {
  const displayedPosts = isExpanded ? posts : posts.slice(0, 3);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-4 gap-6 justify-items-center w-full px-4">
<PopLayout>
        {displayedPosts.map((post, index) => (
          <div
            key={post._id}
           
            className="w-full transform transition-all duration-300 hover:translate-y-[-5px]"
          >
            <PostCard post={post} />
          </div>
        ))}
      </PopLayout>
    </div>
  );
};

export default PostList;
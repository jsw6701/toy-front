
import React from "react";
import { Post } from "@/types/post";
import PostCard from "./PostCard";
import LoadingState from "./LoadingState";

interface PostGridProps {
  posts: Post[];
  isLoading: boolean;
  onPostDeleted?: () => void;
  onPostClick: (post: Post) => void;
}

const PostGrid: React.FC<PostGridProps> = ({ posts, isLoading, onPostDeleted, onPostClick }) => {
  if (isLoading) {
    return <LoadingState />;
  }

  if (posts.length === 0) {
    return (
      <div className="py-20 text-center">
        <h3 className="text-xl text-muted-foreground">No posts found</h3>
        <p className="mt-2">Try changing your search criteria or check back later</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:grid-masonry perspective-1000">
      {posts.map((post, index) => (
        <div 
          key={post.id} 
          className="animate-fade-in"
          style={{ 
            animationDelay: `${index * 0.05}s`,
            transform: `translateZ(${index % 3 * 5}px)`,
            transformStyle: "preserve-3d"
          }}
        >
          <PostCard 
            post={post} 
            onPostDeleted={onPostDeleted}
            onPostClick={onPostClick}
          />
        </div>
      ))}
    </div>
  );
};

export default PostGrid;

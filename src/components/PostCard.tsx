
import { Post } from "@/types/post";
import React from "react";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  // Format the date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return "Unknown date";
    }
  };

  return (
    <div className="post-card animate-fade-in">
      <div className="post-card-content">
        <h3 className="post-title">{post.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {post.content}
        </p>
        <div className="flex justify-between items-center">
          <span className="post-date">{formatDate(post.createdAt)}</span>
          <div className="bg-secondary py-1 px-3 rounded-full text-xs">
            {post.creatorCd}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;

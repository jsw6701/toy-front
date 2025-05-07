
import React from 'react';
import { Post } from '@/types/post';
import { format } from 'date-fns';
import { User, Clock, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import DeletePostButton from '@/components/DeletePostButton';

interface PostDetailProps {
  post: Post;
  onPostDeleted: () => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, onPostDeleted }) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'MMMM dd, yyyy');
    } catch (error) {
      return 'Unknown date';
    }
  };

  return (
    <div className="card-border p-8 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.2),_0_0_30px_rgba(37,99,235,0.2)] animate-scale-in transform translate-z-20 hover:translate-z-25 transition-transform duration-500 bg-card/70">
      <div className="space-y-8 transform-style-3d">
        <h1 className="text-3xl md:text-4xl font-bold transform translate-z-10">
          <span className="text-blue-400">{post.title}</span>
        </h1>
        
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground transform translate-z-5">
          <div className="flex items-center gap-1 post-date">
            <User size={14} />
            <span>{post.creatorCd || 'Unknown'}</span>
          </div>
          <div className="flex items-center gap-1 post-date">
            <Clock size={14} />
            <span>{post.createdAt ? formatDate(post.createdAt) : 'Unknown date'}</span>
          </div>
        </div>
        
        <div className="flex gap-4 transform translate-z-15">
          <Button 
            onClick={() => navigate(`/post/edit/${post.id}`)}
            className="bg-primary text-white hover:bg-primary/80 shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] transform transition-all duration-300 hover:scale-105"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Post
          </Button>
          
          <DeletePostButton 
            postId={post.id} 
            onSuccess={onPostDeleted}
          />
        </div>
        
        <div className="w-full h-[2px] bg-gradient-post opacity-50 my-8 transform translate-z-3 hover:opacity-80 transition-opacity duration-300"></div>
        
        <article className="prose prose-invert max-w-none transform translate-z-5">
          <p className="text-foreground leading-relaxed">
            {post.content}
          </p>
        </article>
        
        <div className="flex flex-wrap gap-2 mt-6">
          <span className="tag">#{post.creatorCd}</span>
          <span className="tag">#post-{post.id}</span>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;

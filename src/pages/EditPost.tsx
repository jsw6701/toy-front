
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostForm from "@/components/PostForm";
import { fetchPostDetail } from "@/services/postService";
import { Post } from "@/types/post";
import { toast } from "@/components/ui/sonner";
import { Power } from "lucide-react";

const EditPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPost = async () => {
      if (!id) {
        navigate("/posts");
        return;
      }
      
      try {
        const postId = parseInt(id, 10);
        const data = await fetchPostDetail(postId);
        setPost(data);
      } catch (error) {
        console.error("Failed to load post for editing:", error);
        toast.error("포스트를 불러오는데 실패했습니다.", {
          position: "bottom-right",
        });
        navigate("/posts");
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [id, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-post-dark relative">
        <div className="absolute inset-0 grid-bg opacity-20"></div>
        <div className="animate-pulse space-y-8 max-w-3xl w-full">
          <div className="h-10 bg-post-darker rounded-full w-3/6 mx-auto"></div>
          <div className="h-64 bg-post-darker rounded-xl w-full"></div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-post-dark relative">
        <div className="absolute inset-0 grid-bg opacity-20"></div>
        <h2 className="text-2xl font-bold text-white">Post not found</h2>
        <p className="text-muted-foreground">The post you're trying to edit doesn't exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16 bg-post-dark overflow-hidden relative">
      <div className="absolute inset-0 grid-bg opacity-20"></div>
      
      <div className="absolute top-5 right-5 md:top-10 md:right-10">
        <button 
          className="animated-button w-10 h-10 md:w-12 md:h-12"
          onClick={() => navigate("/posts")}
        >
          <Power className="w-5 h-5 md:w-6 md:h-6 text-post-dark" />
        </button>
      </div>
      
      <div className="container mx-auto px-4 pt-24 relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          <span className="text-post-yellow neon-text">Edit Post</span>
        </h1>
        
        <PostForm mode="edit" existingPost={post} />
      </div>
    </div>
  );
};

export default EditPost;

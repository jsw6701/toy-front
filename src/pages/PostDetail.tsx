
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ArrowLeft, Clock, User } from "lucide-react";
import { fetchPostDetail } from "@/services/postService";
import { Post } from "@/types/post";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const loadPostDetail = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const postId = parseInt(id, 10);
        const data = await fetchPostDetail(postId);
        setPost(data);
      } catch (error) {
        console.error("Failed to load post detail:", error);
        toast({
          title: "Error",
          description: "Failed to load post details. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadPostDetail();
  }, [id, toast]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "MMMM dd, yyyy");
    } catch (error) {
      return "Unknown date";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse space-y-8 max-w-3xl w-full">
          <div className="h-10 bg-secondary rounded-full w-3/6 mx-auto"></div>
          <div className="h-64 bg-secondary rounded-xl w-full"></div>
          <div className="space-y-4">
            <div className="h-4 bg-secondary rounded-full w-full"></div>
            <div className="h-4 bg-secondary rounded-full w-5/6"></div>
            <div className="h-4 bg-secondary rounded-full w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <h2 className="text-2xl font-bold">Post not found</h2>
        <p className="text-muted-foreground">The post you're looking for doesn't exist or has been removed.</p>
        <Button 
          className="mt-6 flex items-center gap-2"
          onClick={() => navigate("/posts")}
        >
          <ArrowLeft size={16} />
          Back to posts
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <Button 
          variant="ghost" 
          className="flex items-center gap-2 mb-8 hover:bg-secondary/80"
          onClick={() => navigate("/posts")}
        >
          <ArrowLeft size={16} />
          Back to posts
        </Button>
        
        <div className="animate-fade-in space-y-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-post-violet to-post-blue bg-clip-text text-transparent">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <User size={14} />
              <span>{post.creatorCd}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{formatDate(post.createdAt)}</span>
            </div>
          </div>
          
          <div className="w-full h-[2px] bg-gradient-to-r from-post-violet to-post-blue opacity-50 my-8"></div>
          
          <article className="prose prose-lg max-w-none">
            <p className="text-foreground leading-relaxed">
              {post.content}
            </p>
          </article>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;

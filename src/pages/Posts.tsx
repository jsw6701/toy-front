
import React, { useEffect, useState } from "react";
import { PagingResponse, Post } from "@/types/post";
import { fetchPosts } from "@/services/postService";
import Header from "@/components/Header";
import PostGrid from "@/components/PostGrid";
import Pagination from "@/components/Pagination";
import { useToast } from "@/hooks/use-toast";
import { toast } from "@/components/ui/sonner";
import { Power, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Posts: React.FC = () => {
  const [postsData, setPostsData] = useState<PagingResponse<Post> | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { toast: uiToast } = useToast();
  const navigate = useNavigate();
  
  const postsPerPage = 9;

  // Function to refresh posts after actions like delete
  const refreshPosts = async () => {
    try {
      const data = await fetchPosts(currentPage, postsPerPage);
      setPostsData(data);
      toast("데이터 리프레시 완료", {
        description: "최신 게시글을 불러왔습니다.",
        position: "bottom-right"
      });
    } catch (error) {
      console.error("Failed to refresh posts:", error);
    }
  };

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      try {
        const data = await fetchPosts(currentPage, postsPerPage);
        setPostsData(data);
        toast("데이터 로드 완료", {
          description: "최신 게시글을 불러왔습니다.",
          position: "bottom-right"
        });
      } catch (error) {
        console.error("Failed to load posts:", error);
        uiToast({
          title: "Error",
          description: "Failed to load posts. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, [currentPage, uiToast]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const totalPages = postsData
    ? Math.ceil(postsData.totalCount / postsPerPage)
    : 0;

  return (
    <div className="min-h-screen pb-16 bg-post-dark overflow-hidden relative perspective-1000">
      <div className="absolute inset-0 grid-bg opacity-20 rotate-3d"></div>
      
      <div className="absolute top-5 right-5 md:top-10 md:right-10">
        <button className="animated-button w-10 h-10 md:w-12 md:h-12 z-10 transform hover:rotate-12 transition-all duration-300">
          <Power className="w-5 h-5 md:w-6 md:h-6 text-post-dark" />
        </button>
      </div>
      
      <Header />
      
      <main className="container mx-auto px-4 relative z-10 transform-style-3d">
        <div className="pb-4 mb-6 border-b border-[#324da0]/30 hover:border-[#324da0]/60 transition-all duration-300">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-medium text-white neon-text-blue">Latest Posts</h2>
            <div className="flex items-center gap-4">
              <Button 
                className="bg-post-yellow text-post-dark hover:bg-post-yellow/90 flex items-center gap-2 shadow-[0_0_15px_rgba(255,185,33,0.3)] hover:shadow-[0_0_20px_rgba(255,185,33,0.5)] transform transition-all duration-300"
                onClick={() => navigate("/post/create")}
              >
                <Plus className="w-4 h-4" />
                New Post
              </Button>
              <div className="text-sm text-muted-foreground">
                {postsData ? (
                  <span>
                    Showing{" "}
                    <span className="font-medium text-post-yellow neon-text">{postsData.resultList.length}</span> of{" "}
                    <span className="font-medium text-post-yellow neon-text">{postsData.totalCount}</span> posts
                  </span>
                ) : (
                  <span>&nbsp;</span>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <PostGrid
          posts={postsData?.resultList || []}
          isLoading={isLoading}
          onPostDeleted={refreshPosts}
        />
        
        {postsData && postsData.totalCount > 0 && (
          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Posts;

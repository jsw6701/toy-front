
import React, { useEffect, useState } from "react";
import { PagingResponse, Post } from "@/types/post";
import { fetchPosts, fetchPostDetail } from "@/services/postService";
import Header from "@/components/Header";
import PostGrid from "@/components/PostGrid";
import Pagination from "@/components/Pagination";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/MainLayout";

const Index = () => {
  const [postsData, setPostsData] = useState<PagingResponse<Post> | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const postsPerPage = 9;

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      try {
        const data = await fetchPosts(currentPage, postsPerPage);
        setPostsData(data);
      } catch (error) {
        console.error("Failed to load posts:", error);
        toast({
          title: "Error",
          description: "Failed to load posts. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, [currentPage, toast]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Add handler for post click to navigate to post detail page
  const handlePostClick = (post: Post) => {
    navigate(`/post/${post.id}`);
  };

  const totalPages = postsData
    ? Math.ceil(postsData.totalCount / postsPerPage)
    : 0;

  return (
    <MainLayout>
      <div className="min-h-screen pb-16">
        <Header />
        
        <main className="container mx-auto px-4">
          <div className="pb-4 mb-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-medium">Latest Posts</h2>
              <div className="text-sm text-muted-foreground">
                {postsData ? (
                  <span>
                    Showing{" "}
                    <span className="font-medium">{postsData.resultList.length}</span> of{" "}
                    <span className="font-medium">{postsData.totalCount}</span> posts
                  </span>
                ) : (
                  <span>&nbsp;</span>
                )}
              </div>
            </div>
          </div>
          
          <PostGrid
            posts={postsData?.resultList || []}
            isLoading={isLoading}
            onPostClick={handlePostClick}
          />
          
          {postsData && postsData.totalCount > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </main>
      </div>
    </MainLayout>
  );
};

export default Index;

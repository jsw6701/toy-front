
import React, { useEffect, useState } from "react";
import { PagingResponse, Post } from "@/types/post";
import { fetchPosts, fetchPostDetail } from "@/services/postService";
import Header from "@/components/Header";
import PostGrid from "@/components/PostGrid";
import Pagination from "@/components/Pagination";
import { useToast } from "@/hooks/use-toast";
import { toast } from "@/components/ui/sonner";
import { Power, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import TabPostView from "@/components/TabPostView";
import MainLayout from "@/components/MainLayout";

const Posts: React.FC = () => {
  const [postsData, setPostsData] = useState<PagingResponse<Post> | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [openPosts, setOpenPosts] = useState<Post[]>([]);
  const [activePostId, setActivePostId] = useState<number | null>(null);
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

      // Update openPosts if any were deleted
      setOpenPosts(prevOpenPosts => {
        const updatedOpenPosts = prevOpenPosts.filter(openPost => 
          data.resultList.some(post => post.id === openPost.id)
        );
        return updatedOpenPosts;
      });
      
      // If the active post was deleted, set activePostId to the last open post or null
      if (activePostId && !data.resultList.some(post => post.id === activePostId)) {
        const lastOpenPost = openPosts.at(-1);
        setActivePostId(lastOpenPost?.id || null);
      }
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

  const handlePostClick = async (post: Post) => {
    // Check if the post is already open in a tab
    if (openPosts.some(p => p.id === post.id)) {
      setActivePostId(post.id);
      return;
    }

    try {
      // Fetch full post details
      const postDetail = await fetchPostDetail(post.id);
      
      // Add the post to open tabs and set it as active
      setOpenPosts(prev => [...prev, postDetail]);
      setActivePostId(post.id);
    } catch (error) {
      console.error("Failed to fetch post details:", error);
      toast.error("포스트 상세 정보를 불러오는데 실패했습니다.", {
        position: "bottom-right"
      });
    }
  };

  const handleTabChange = (postId: number | null) => {
    setActivePostId(postId);
  };

  const handleCloseTab = (postId: number) => {
    setOpenPosts(prev => prev.filter(p => p.id !== postId));
    
    // If we're closing the active tab, set the last tab as active
    if (activePostId === postId) {
      const remainingPosts = openPosts.filter(p => p.id !== postId);
      setActivePostId(remainingPosts.length > 0 ? remainingPosts[remainingPosts.length - 1].id : null);
    }
  };

  const totalPages = postsData
    ? Math.ceil(postsData.totalCount / postsPerPage)
    : 0;

  return (
    <MainLayout>
      <div className="min-h-screen pb-16 relative perspective-1000">
        <div className="absolute inset-0 opacity-20 rotate-3d texture-dots"></div>
        
        <div className="absolute top-5 right-5 md:top-10 md:right-10">
          <button 
            className="animated-button w-10 h-10 md:w-12 md:h-12 z-10 transform hover:rotate-12 transition-all duration-300"
            onClick={() => navigate("/")}
          >
            <Power className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </button>
        </div>
        
        <Header />
        
        <main className="container mx-auto px-4 relative z-10 transform-style-3d">
          <div className="pb-4 mb-6 border-b border-primary/30 hover:border-primary/60 transition-all duration-300">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-medium text-white">Latest Posts</h2>
              <div className="flex items-center gap-4">
                <Button 
                  className="bg-emerald-500 text-white hover:bg-emerald-500/90 flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] transform transition-all duration-300"
                  onClick={() => navigate("/post/create")}
                >
                  <Plus className="w-4 h-4" />
                  New Post
                </Button>
                <div className="text-sm text-muted-foreground">
                  {postsData ? (
                    <span>
                      Showing{" "}
                      <span className="font-medium text-blue-400">{postsData.resultList.length}</span> of{" "}
                      <span className="font-medium text-blue-400">{postsData.totalCount}</span> posts
                    </span>
                  ) : (
                    <span>&nbsp;</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <TabPostView 
            openPosts={openPosts}
            activePostId={activePostId}
            onTabChange={handleTabChange}
            onCloseTab={handleCloseTab}
            onPostDeleted={refreshPosts}
          />
          
          {(!activePostId || activePostId === null) && (
            <PostGrid
              posts={postsData?.resultList || []}
              isLoading={isLoading}
              onPostDeleted={refreshPosts}
              onPostClick={handlePostClick}
            />
          )}
          
          {postsData && postsData.totalCount > 0 && !activePostId && (
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
    </MainLayout>
  );
};

export default Posts;

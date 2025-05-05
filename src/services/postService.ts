
import { ApiResponse, DetailResponse, PagingResponse, Post } from "@/types/post";
import { toast } from "@/components/ui/sonner";

export const fetchPosts = async (
  pageNo: number = 1,
  pageRow: number = 10,
  isDeleted: string = "N"
): Promise<PagingResponse<Post>> => {
  try {
    const params = new URLSearchParams();
    params.append("pageNo", pageNo.toString());
    params.append("pageRow", pageRow.toString());
    if (isDeleted) {
      params.append("isDeleted", isDeleted);
    }

    const response = await fetch(
      `http://localhost:8080/api/v1/post/all?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }

    const data: ApiResponse<PagingResponse<Post>> = await response.json();
    return data.data.result;
  } catch (error) {
    console.error("Error fetching posts:", error);
    toast.error("포스트를 불러오는데 실패했습니다.", {
      position: "bottom-right",
    });
    // Return empty response on error
    return {
      resultList: [],
      totalCount: 0,
      currentPageNo: pageNo,
      firstPageNo: 1,
      lastPageNo: 1,
    };
  }
};

export const fetchPostDetail = async (postId: number): Promise<Post> => {
  try {
    const requestBody = {
      postId: postId
    };
    
    const response = await fetch(
        `http://localhost:8080/api/v1/post/detail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody)
        }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch post detail: ${response.status}`);
    }

    const data: ApiResponse<DetailResponse<Post>> = await response.json();
    return data.data.result.result;
  } catch (error) {
    console.error("Error fetching post detail:", error);
    toast.error("포스트 상세 정보를 불러오는데 실패했습니다.", {
      position: "bottom-right",
    });
    throw error;
  }
};

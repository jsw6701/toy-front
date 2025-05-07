
import { ApiResponse, DetailResponse, PagingResponse, Post } from "@/types/post";
import { toast } from "@/components/ui/sonner";

// Base URL for API calls
const API_BASE_URL = "http://localhost:8080/api/v1/post";

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
      `${API_BASE_URL}/all?${params.toString()}`
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
    // Always use GET for fetching post details - this is important!
    const response = await fetch(
      `${API_BASE_URL}/detail?postId=${postId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch post detail: ${response.status}`);
    }

    const data: ApiResponse<DetailResponse<Post>> = await response.json();
    return data.data.result.result;
  } catch (error) {
    console.error("Error fetching post detail:", error);
    throw error;
  }
};

// Types for create, update, and delete operations
export interface PostCreateRequestDto {
  title: string;
  content: string;
  creatorCd?: string;
}

export interface PostUpdateRequestDto {
  postId: number;
  title: string;
  content: string;
  updaterCd?: string;
}

export interface PostDeleteRequestDto {
  postId: number;
  updaterCd?: string;
}

export interface CreatedData {
  id: number;
}

export interface CreatedResponse<T> {
  message: string;
  resultList: T[];
}

// Create a new post
export const createPost = async (postData: PostCreateRequestDto): Promise<CreatedResponse<CreatedData>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData)
    });

    if (!response.ok) {
      throw new Error(`Failed to create post: ${response.status}`);
    }

    const data = await response.json();
    toast.success("게시글이 성공적으로 생성되었습니다.", {
      position: "bottom-right",
    });
    return data.data.result;
  } catch (error) {
    console.error("Error creating post:", error);
    toast.error("게시글 생성에 실패했습니다.", {
      position: "bottom-right",
    });
    throw error;
  }
};

// Update an existing post
export const updatePost = async (postData: PostUpdateRequestDto): Promise<CreatedResponse<CreatedData>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData)
    });

    if (!response.ok) {
      throw new Error(`Failed to update post: ${response.status}`);
    }

    const data = await response.json();
    toast.success("게시글이 성공적으로 수정되었습니다.", {
      position: "bottom-right",
    });
    return data.data.result;
  } catch (error) {
    console.error("Error updating post:", error);
    toast.error("게시글 수정에 실패했습니다.", {
      position: "bottom-right",
    });
    throw error;
  }
};

// Delete a post
export const deletePost = async (postData: PostDeleteRequestDto): Promise<CreatedResponse<CreatedData>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/delete`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData)
    });

    if (!response.ok) {
      throw new Error(`Failed to delete post: ${response.status}`);
    }

    const data = await response.json();
    toast.success("게시글이 성공적으로 삭제되었습니다.", {
      position: "bottom-right",
    });
    return data.data.result;
  } catch (error) {
    console.error("Error deleting post:", error);
    toast.error("게시글 삭제에 실패했습니다.", {
      position: "bottom-right",
    });
    throw error;
  }
};


export interface Post {
  id: number;
  title: string;
  content: string;
  creatorCd: string;
  createdAt: string;
  updaterCd: string;
  updatedAt: string;
  isDeleted: string;
}

export interface PagingResponse<T> {
  resultList: T[];
  totalCount: number;
  currentPageNo: number;
  firstPageNo: number;
  lastPageNo: number;
}

export interface DetailResponse<T> {
  result: T;
}

export interface ApiResponse<T> {
  message: string;
  timestamp: number;
  data: {
    result: T;
  };
}

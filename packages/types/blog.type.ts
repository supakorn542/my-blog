export type IBlog = {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  coverImageUrl: string;
  additionalImages: string[];
  viewCount: number;
  isPublished: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ICreateBlogRequest = Omit<
  IBlog,
  "id" | "viewCount" | "slug" | "publishedAt" | "createdAt" | "updatedAt" | "excerpt"
> & {
  excerpt?: string;
};

export type IUpdateBlogRequest = Partial<ICreateBlogRequest> & {
  isPublished?: boolean;
  slug?: string;
};

export type IGetBlogsPaginationRequest = {
  page?: number;
  limit?: number;
};

export type IBlogResponse = IBlog;

export type IBlogPaginatedResponse = {
  data: Omit<IBlogResponse, "content">[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number; 
  };
};
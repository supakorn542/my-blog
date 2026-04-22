export type IBlog = {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  cover_image_url: string;
  additional_images: string[];
  view_count: number;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ICreateBlogRequest = Omit<
  IBlog,
  "id" | "view_count" | "slug" | "published_at" | "created_at" | "updated_at"
> & {
  excerpt?: string;
};

export type IUpdateBlogRequest = Partial<ICreateBlogRequest> & {
  is_published?: boolean;
  slug?: string;
};

export type IBlogResponse = IBlog;

export type IBlogPaginatedResponse = {
  data: Omit<IBlogResponse, "content">[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    total_pages: number;
  };
};

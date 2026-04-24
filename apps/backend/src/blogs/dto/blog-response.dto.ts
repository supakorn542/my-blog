import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IBlogPaginatedResponse, IBlogResponse } from '@my-blog/types';

export class BlogResponseDto implements IBlogResponse {
  @ApiProperty({ example: '550e8400...', description: 'UUID' })
  id: string;

  @ApiProperty({ example: 'how-to-setup-nestjs', description: 'Slug' })
  slug: string;

  @ApiProperty({ example: 'How to Setup NestJS', description: 'Title' })
  title: string;

  @ApiProperty({ example: 'Content...', description: 'Content' })
  content: string;

  @ApiProperty({ example: 'Summary...', description: 'Excerpt' })
  excerpt: string;

  @ApiProperty({ example: 'https://...', description: 'Cover Image' })
  coverImageUrl: string;

  @ApiProperty({ example: ['https://...'], description: 'Additional Images', type: [String] })
  additionalImages: string[];

  @ApiProperty({ example: 1250, description: 'View count' })
  viewCount: number;

  @ApiProperty({ example: true, description: 'Is published' })
  isPublished: boolean;

  @ApiPropertyOptional({ example: '2024-03-20T09:00:00Z', nullable: true })
  publishedAt: string | null;

  @ApiProperty({ example: '2024-03-15T08:30:00Z' })
  createdAt: string;

  @ApiProperty({ example: '2024-03-16T10:00:00Z' })
  updatedAt: string;
}

class BlogListItemDto extends OmitType(BlogResponseDto, ['content'] as const) {}

export class PaginatedBlogResponseDto implements IBlogPaginatedResponse {
  @ApiProperty({ type: [BlogListItemDto] })
  data: BlogListItemDto[];

  @ApiProperty({
    example: { total: 100, page: 1, limit: 10, totalPages: 10 },
  })
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
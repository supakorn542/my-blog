import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IBlogResponse } from '@my-blog/types';

export class BlogResponseDto implements IBlogResponse {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'The unique identifier of the blog (UUID)',
  })
  id: string;

  @ApiProperty({
    example: 'how-to-setup-nestjs',
    description: 'The URL-friendly identifier of the blog',
  })
  slug: string;

  @ApiProperty({
    example: 'How to Setup NestJS',
    description: 'The title of the blog post',
  })
  title: string;

  @ApiProperty({
    example: 'Content of the blog',
    description: 'The main body content of the blog post',
  })
  content: string;

  @ApiProperty({
    example: 'A short summary of the blog post',
    description: 'The excerpt or summary of the blog post',
  })
  excerpt: string;

  @ApiProperty({
    example: 'https://example.com/images/cover.jpg',
    description: 'The main cover image URL',
  })
  cover_image_url: string;

  @ApiProperty({
    example: ['https://example.com/img1.jpg', 'https://example.com/img2.jpg'],
    description: 'Additional images used in the blog post',
    type: [String],
  })
  additional_images: string[];

  @ApiProperty({
    example: 1250,
    description: 'Total number of views',
  })
  view_count: number;

  @ApiProperty({
    example: true,
    description: 'Publication status',
  })
  is_published: boolean;

  @ApiPropertyOptional({
    example: '2024-03-20T09:00:00Z',
    description: 'The date and time when the blog was published',
    nullable: true,
  })
  published_at: string | null;

  @ApiProperty({
    example: '2024-03-15T08:30:00Z',
    description: 'The creation date and time',
  })
  created_at: string;

  @ApiProperty({
    example: '2024-03-16T10:00:00Z',
    description: 'The last update date and time',
  })
  updated_at: string;
}
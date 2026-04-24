import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsArray,
  IsUrl,
} from 'class-validator';

import type { ICreateBlogRequest } from '@my-blog/types';

export class CreateBlogDto implements ICreateBlogRequest {
  @ApiProperty({
    description: 'The title of the blog post',
    example: '10 Tips for Mastering NestJS',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The main body content of the blog post',
    example: 'In this article, we will explore the best practices for...',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional({
    description: 'A brief summary or snippet of the blog post',
    example: 'A quick guide to improving your backend development workflow.',
  })
  @IsString()
  @IsOptional()
  excerpt?: string;

  @ApiProperty({
    description: 'The URL of the main cover image',
    example: 'https://example.com/images/nest-js-mastery.jpg',
  })
  @IsUrl()
  @IsNotEmpty()
  cover_image_url: string;

  @ApiProperty({
    description: 'A list of additional image URLs used within the article',
    type: [String],
    example: [
      'https://example.com/images/step-1.png',
      'https://example.com/images/step-2.png',
    ],
  })
  @IsArray()
  @IsString({ each: true })
  additional_images: string[];

  @ApiProperty({
    description: 'The publication status of the blog post',
    example: true,
  })
  @IsBoolean()
  is_published: boolean;
}

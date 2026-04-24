import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsArray, IsUrl } from 'class-validator';
import type { ICreateBlogRequest } from '@my-blog/types';

export class CreateBlogDto implements ICreateBlogRequest {
  @ApiProperty({ example: '10 Tips for Mastering NestJS' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'In this article...' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional({ example: 'A quick guide...' })
  @IsString()
  @IsOptional()
  excerpt?: string;

  @ApiProperty({ example: 'https://example.com/cover.jpg' })
  @IsUrl()
  @IsNotEmpty()
  coverImageUrl: string;

  @ApiProperty({ type: [String], example: ['https://example.com/step-1.png'] })
  @IsArray()
  @IsString({ each: true })
  additionalImages: string[];

  @ApiProperty({ example: true })
  @IsBoolean()
  isPublished: boolean;
}
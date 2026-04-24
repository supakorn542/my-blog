import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateBlogDto } from './create-blog.dto';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { IUpdateBlogRequest } from '@my-blog/types';

export class UpdateBlogDto extends PartialType(CreateBlogDto) implements IUpdateBlogRequest {
  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @ApiPropertyOptional({ example: 'new-url-slug' })
  @IsString()
  @IsOptional()
  slug?: string;
}
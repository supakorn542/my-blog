import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Blog } from './entities/blog.entity';
import { BlogResponseDto, PaginatedBlogResponseDto } from './dto/blog-response.dto';
import { GetBlogsDto } from './dto/get-blogs.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@ApiTags('Blogs')
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @ApiOperation({ summary: 'Create a new blog post' })
  @ApiResponse({
    status: 201,
    description: 'The blog post has been successfully created.',
    type: BlogResponseDto,
  })
  @Post()
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogsService.create(createBlogDto);
  }

  @ApiOperation({ summary: 'Get all blog posts with pagination' })
  @ApiResponse({
    status: 200,
    description: 'List of blog posts successfully retrieved.',
    type: PaginatedBlogResponseDto,
  })
  @Get()
  async findAll(@Query() query: GetBlogsDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    return await this.blogsService.findAll(page, limit);
  }

  @ApiOperation({ summary: 'Get blog details by ID or Slug' })
  @ApiResponse({
    status: 200,
    description: 'Blog details successfully retrieved.',
    type: BlogResponseDto,
  })
  @Get(':identifier')
  async findOne(@Param('identifier') identifier: string) {
    return await this.blogsService.findOne(identifier);
  }


  @ApiOperation({ summary: 'Update a blog post (Admin)' })
  @ApiResponse({
    status: 200,
    description: 'The blog post has been successfully updated.',
    type: BlogResponseDto,
  })
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBlogDto: UpdateBlogDto,
  ) {
    return await this.blogsService.update(id, updateBlogDto);
  }

  @ApiOperation({ summary: 'Delete a blog post (Admin)' })
  @ApiResponse({
    status: 200,
    description: 'The blog post has been successfully deleted.',
  })
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.blogsService.remove(id);
    return { message: 'Blog deleted successfully' };
  }
}

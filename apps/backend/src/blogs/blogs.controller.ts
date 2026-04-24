import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Blog } from './entities/blog.entity';
import {
  BlogResponseDto,
  PaginatedBlogResponseDto,
} from './dto/blog-response.dto';
import { GetBlogsDto } from './dto/get-blogs.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

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
  @UseGuards(JwtAuthGuard)
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
    return await this.blogsService.findAll(page, limit, false);
  }

  @ApiOperation({ summary: 'Get all blogs for Admin (including Drafts)' })
  @UseGuards(JwtAuthGuard)
  @Get('admin')
  async findAdminBlogAll(@Query() query: GetBlogsDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    return await this.blogsService.findAll(page, limit, true);
  }

  @ApiOperation({ summary: 'Get blog detail for Admin (including Drafts)' })
  @UseGuards(JwtAuthGuard)
  @Get('admin/:id')
  async findAdminBlogOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.blogsService.findOne(id, true);
  }

  @ApiOperation({ summary: 'Get blog details by ID or Slug' })
  @ApiResponse({
    status: 200,
    description: 'Blog details successfully retrieved.',
    type: BlogResponseDto,
  })
  @Get(':identifier')
  async findOne(@Param('identifier') identifier: string) {
    return await this.blogsService.findOne(identifier, false);
  }

  @ApiOperation({ summary: 'Update a blog post (Admin)' })
  @ApiResponse({
    status: 200,
    description: 'The blog post has been successfully updated.',
    type: BlogResponseDto,
  })
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.blogsService.remove(id);
    return { message: 'Blog deleted successfully' };
  }
}

// apps/backend/src/comments/comments.controller.ts
import { Controller, Get, Post, Body, Patch, Param, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentStatusDto } from './dto/update-comment-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}



  @ApiOperation({ summary: 'Submit a new comment' })
  @ApiResponse({ status: 201, description: 'Comment submitted successfully' })
  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    return await this.commentsService.create(createCommentDto);
  }

  @ApiOperation({ summary: 'Get approved comments for a specific blog' })
  @Get('blog/:blogId')
  async findByBlog(@Param('blogId', ParseUUIDPipe) blogId: string) {
    return await this.commentsService.findByBlogId(blogId);
  }

 

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all comments for moderation (Admin only)' })
  @UseGuards(JwtAuthGuard)
  @Get('admin')
  async findAll() {
    return await this.commentsService.findAllForAdmin();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Approve or reject a comment (Admin only)' })
  @UseGuards(JwtAuthGuard)
  @Patch('admin/:id/status')
  async updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateCommentStatusDto,
  ) {
    return await this.commentsService.updateStatus(id, updateDto.status);
  }
}
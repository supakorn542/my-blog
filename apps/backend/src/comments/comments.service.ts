import { CommentStatus, ICommentResponse } from '@my-blog/types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  private mapToResponse(comment: Comment): ICommentResponse {
    return {
      id: comment.id,
      blogId: comment.blogId,
      senderName: comment.senderName,
      content: comment.content,
      status: comment.status,
      createdAt: comment.createdAt.toISOString(),
    };
  }

  async create(dto: CreateCommentDto): Promise<ICommentResponse> {
    const newComment = this.commentRepository.create(dto);
    const saved = await this.commentRepository.save(newComment);
    return this.mapToResponse(saved);
  }


  async updateStatus(
    id: string,
    status: CommentStatus,
  ): Promise<ICommentResponse> {
    const comment = await this.commentRepository.findOne({ where: { id } });
    if (!comment) throw new NotFoundException('Comment not found');

    comment.status = status;
    const updated = await this.commentRepository.save(comment);
    return this.mapToResponse(updated);
  }


  async findByBlogId(blogId: string): Promise<ICommentResponse[]> {
    const comments = await this.commentRepository.find({
      where: {
        blogId,
        status: 'APPROVED'
      },
      order: { createdAt: 'DESC' },
    });
    return comments.map(comment => this.mapToResponse(comment));
  }

  async findAllForAdmin(): Promise<ICommentResponse[]> {
    const comments = await this.commentRepository.find({
      order: { createdAt: 'DESC' },
    });
    return comments.map(comment => this.mapToResponse(comment));
  }
}

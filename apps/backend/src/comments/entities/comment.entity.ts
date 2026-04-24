// apps/backend/src/comments/entities/comment.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Blog } from '../../blogs/entities/blog.entity';
import { CommentStatus } from '@my-blog/types'; // ใช้ Type จากที่เขียนไว้

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'sender_name' })
  senderName: string;

  @Column('text')
  content: string;

  @Column({
    type: 'varchar',
    default: 'PENDING',
  })
  status: CommentStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Blog, (blog) => blog.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'blog_id' })
  blog: Blog;

  @Column({ name: 'blog_id' })
  blogId: string;
}
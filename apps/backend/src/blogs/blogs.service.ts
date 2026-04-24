import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
  ) {}

  async create(blogDto: CreateBlogDto): Promise<Blog> {
    const newBlog = this.blogRepository.create(blogDto);
    return await this.blogRepository.save(newBlog);
  }
}

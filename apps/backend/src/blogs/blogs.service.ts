import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import slugify from 'slugify';
import { IBlogPaginatedResponse, IBlogResponse } from '@my-blog/types';
import { validate as isUUID } from 'uuid';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
  ) {}

  private mapToResponse(blog: Blog): IBlogResponse {
    return {
      id: blog.id,
      slug: blog.slug,
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt,
      coverImageUrl: blog.coverImageUrl,
      additionalImages: blog.additionalImages,
      viewCount: blog.viewCount,
      isPublished: blog.isPublished,
      publishedAt: blog.publishedAt ? blog.publishedAt.toISOString() : null,
      createdAt: blog.createdAt.toISOString(),
      updatedAt: blog.updatedAt.toISOString(),
    };
  }

  private async generateUniqueSlug(slug: string): Promise<string> {
    let uniqueSlug = slug;
    let count = 1;

    while (true) {
      const existingBlog = await this.blogRepository.findOne({
        where: { slug: uniqueSlug },
      });

      if (!existingBlog) {
        break;
      }

      uniqueSlug = `${slug}-${count}`;
      count++;
    }

    return uniqueSlug;
  }

  async create(blogDto: CreateBlogDto): Promise<IBlogResponse> {
    const slug = slugify(blogDto.title, {
      lower: true,
      strict: true,
      trim: true,
    });

    const finalSlug = await this.generateUniqueSlug(slug);

    const newBlog = this.blogRepository.create({
      ...blogDto,
      slug: finalSlug,
    });
    const savedBlog = await this.blogRepository.save(newBlog);
    return this.mapToResponse(savedBlog);
  }

  async findAll(
    page: number,
    limit: number,
    isAdmin = false,
  ): Promise<IBlogPaginatedResponse> {
    const skip = (page - 1) * limit;

    const whereCondition = isAdmin ? {} : { isPublished: true };

    const [data, total] = await this.blogRepository.findAndCount({
      where: whereCondition,
      skip: skip,
      take: limit,
      order: {
        createdAt: 'DESC',
      },
      select: [
        'id',
        'slug',
        'title',
        'excerpt',
        'coverImageUrl',
        'additionalImages',
        'viewCount',
        'isPublished',
        'publishedAt',
        'createdAt',
        'updatedAt',
      ],
    });

    return {
      data: data.map((blog) => {
        const fullResponse = this.mapToResponse(blog);

        return fullResponse;
      }),
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(identifier: string, isAdmin = false): Promise<IBlogResponse> {
    const isId = isUUID(identifier);

    const where: any = isId ? { id: identifier } : { slug: identifier };

    if (!isAdmin) {
      where.isPublished = true;
    }

    const blog = await this.blogRepository.findOne({ where });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    if (!isAdmin) {
      blog.viewCount += 1;
      await this.blogRepository.save(blog);
    }

    return this.mapToResponse(blog);
  }

  async update(
    id: string,
    updateBlogDto: UpdateBlogDto,
  ): Promise<IBlogResponse> {
    const blog = await this.blogRepository.findOne({ where: { id } });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    if (updateBlogDto.slug && updateBlogDto.slug !== blog.slug) {
      const baseSlug = slugify(updateBlogDto.slug, {
        lower: true,
        strict: true,
        trim: true,
      });

      blog.slug = await this.generateUniqueSlug(baseSlug);
    }

    if (updateBlogDto.isPublished !== undefined) {
      blog.isPublished = updateBlogDto.isPublished;

      if (blog.isPublished && !blog.publishedAt) {
        blog.publishedAt = new Date();
      }

      if (!blog.isPublished) {
        blog.publishedAt = null;
      }
    }

    const { slug, isPublished, ...restUpdate } = updateBlogDto;
    Object.assign(blog, restUpdate);

    const updatedBlog = await this.blogRepository.save(blog);
    return this.mapToResponse(updatedBlog);
  }

  async remove(id: string): Promise<void> {
    const result = await this.blogRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Blog not found');
    }
  }
}

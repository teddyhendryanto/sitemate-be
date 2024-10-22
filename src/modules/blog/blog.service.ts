import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Not, Repository } from 'typeorm';
import { Blog } from '../../databases/entities';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
  constructor(@InjectRepository(Blog) private blogRepository: Repository<Blog>) {}

  async delete(userId: string, id: string): Promise<Blog> {
    const blog = await this.blogRepository.findOne({
      where: { id, userId },
    });

    if (!blog) throw new NotFoundException('Blog not found');

    blog.deletedAt = new Date();

    return this.blogRepository.save(blog);
  }

  async detail(userId: string, id: string): Promise<Blog> {
    const blog = await this.blogRepository.findOne({
      where: { id, userId },
    });

    if (!blog) throw new NotFoundException('Blog not found.');

    return blog;
  }

  async findByAttribute(findOption: FindManyOptions<Blog>): Promise<Blog[]> {
    return await this.blogRepository.find(findOption);
  }

  async findOneByAttribute(findOption: FindOneOptions<Blog>): Promise<Blog> {
    return await this.blogRepository.findOne(findOption);
  }

  async list(userId: string): Promise<Blog[]> {
    return this.findByAttribute({
      where: { userId },
      order: { createdAt: 'desc' },
    });
  }

  async create(userId: string, createBlogInput: CreateBlogDto): Promise<Blog> {
    const { title, description } = createBlogInput;

    const blogExists = await this.blogRepository.findOne({
      where: { userId, title },
    });

    if (blogExists) throw new BadRequestException('Blog name exists.');

    const blog = this.blogRepository.create({
      title,
      description,
      userId,
    });

    return this.blogRepository.save(blog);
  }

  async update(userId: string, id: string, updateBlogInput: UpdateBlogDto): Promise<Blog> {
    const { title, description } = updateBlogInput;

    const blog = await this.blogRepository.findOne({
      where: { userId, id },
    });

    if (!blog) throw new NotFoundException('Blog not found');

    if (title) {
      const blogExists = await this.blogRepository.findOne({
        where: { userId, id: Not(id), title },
      });

      if (blogExists) throw new BadRequestException('Blog name exists.');
    }

    if (title) blog.title = title;
    if (description) blog.description = description;

    try {
      return this.blogRepository.save(blog);
    } catch (error) {
      throw new InternalServerErrorException(`Failed to update blog due to ${error}`);
    }
  }
}

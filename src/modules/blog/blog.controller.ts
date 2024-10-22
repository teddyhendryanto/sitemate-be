import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CurrentUser } from '../../common/decorators';
import { User } from '../../databases/entities';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { ResourceBlogDto } from './dto/resource-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller()
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get()
  async list(@CurrentUser() user: User): Promise<ResourceBlogDto[]> {
    const result = await this.blogService.list(user?.id);

    return ResourceBlogDto.fromEntities(result);
  }

  @Get(':id/detail')
  async show(@CurrentUser() user: User, @Param('id') id: string): Promise<ResourceBlogDto> {
    const result = await this.blogService.detail(user?.id, id);

    return ResourceBlogDto.fromEntity(result);
  }

  @Post()
  async store(@CurrentUser() user: User, @Body() createBlogDto: CreateBlogDto): Promise<ResourceBlogDto> {
    const result = await this.blogService.create(user?.id, createBlogDto);

    return ResourceBlogDto.fromEntity(result);
  }

  @Put(':id')
  async update(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
  ): Promise<ResourceBlogDto> {
    const result = await this.blogService.update(user?.id, id, updateBlogDto);

    return ResourceBlogDto.fromEntity(result);
  }

  @Delete(':id')
  async destroy(@CurrentUser() user: User, @Param('id') id: string): Promise<ResourceBlogDto> {
    const result = await this.blogService.delete(user?.id, id);

    return ResourceBlogDto.fromEntity(result);
  }
}

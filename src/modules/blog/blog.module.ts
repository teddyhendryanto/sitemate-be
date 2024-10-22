import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from '../../databases/entities';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';

@Module({
  exports: [BlogService],
  imports: [TypeOrmModule.forFeature([Blog])],
  providers: [BlogService],
  controllers: [BlogController],
})
export class BlogModule {}

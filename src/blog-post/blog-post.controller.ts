import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { BlogPostService } from './blog-post.service';
import { CreateBlogPostDto } from './dto/create-blogpost.dto';

import { UpdateBlogPostDto } from './dto/update-blogpost.dto';

@Controller('blog')
export class BlogPostController {
  constructor(private readonly blogPostService: BlogPostService) {}

  @Post()
  create(@Body() body: CreateBlogPostDto) {
    return this.blogPostService.create(body);
  }

  @Get()
  find(@Query() query: any) {
    if (query?.id) {
      return this.blogPostService.findOne(query.id);
    }
    if (query?.limit) {
      return this.blogPostService.findAll(query.limit);
    }
    return this.blogPostService.findAll();
  }

  @Get(`:slug`)
  findOne(@Param(`slug`) slug: string) {
    return this.blogPostService.findOneBySlug(slug);
  }

  @Put(`:id`)
  update(@Param(`id`) id: string, @Body() body: UpdateBlogPostDto) {
    return this.blogPostService.updateOne(id, body);
  }

  // @Get()
  // findOne(@Param(`id`) id: string) {
  //   return this.blogPostService.findOne(id);
  // }
}

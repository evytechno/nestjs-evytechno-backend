import { Body, Controller, Get, Post } from '@nestjs/common';
import { BlogPostService } from './blog-post.service';
import { CreateBlogPostDto } from './dto/create-blogpost.dto';

@Controller('blog')
export class BlogPostController {
  constructor(private readonly blogPostService: BlogPostService) {}

  @Post()
  create(@Body() body: CreateBlogPostDto) {
    return this.blogPostService.create(body);
  }

  @Get()
  find() {
    return this.blogPostService.findAll();
  }
}

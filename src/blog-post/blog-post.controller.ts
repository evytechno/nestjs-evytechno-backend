import { Body, Controller, Post } from '@nestjs/common';
import { BlogPostService } from './blog-post.service';
import { CreateBlogPostDto } from './dto/create-blogpost.dto';

@Controller('blog')
export class BlogPostController {
  constructor(private readonly blogPostService: BlogPostService) {}

  @Post()
  create(@Body() body: CreateBlogPostDto) {
    return this.blogPostService.create(body);
  }
}

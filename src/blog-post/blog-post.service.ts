import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BlogPost, BlogPostDocument } from './schemas/blogPost.schema';
import { Model } from 'mongoose';
import { CreateBlogPostDto } from './dto/create-blogpost.dto';

@Injectable()
export class BlogPostService {
  constructor(
    @InjectModel(BlogPost.name) private blogPostModel: Model<BlogPostDocument>,
  ) {}

  async create(data: CreateBlogPostDto) {
    try {
      const newBlogPost = await this.blogPostModel.create(data);
      return {
        success: true,
        data: newBlogPost,
        message: 'Blog Post created successfully',
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          success: false,
          error: error,
          message: 'server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

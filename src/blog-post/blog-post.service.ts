import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BlogPost, BlogPostDocument } from './schemas/blogPost.schema';
import { Model } from 'mongoose';
import { CreateBlogPostDto } from './dto/create-blogpost.dto';
import { FindBlogPostDto } from './dto/find-blogpost.dto';

@Injectable()
export class BlogPostService {
  constructor(
    @InjectModel(BlogPost.name) private blogPostModel: Model<BlogPostDocument>,
  ) {}
  //Create new blog post
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

      if (error.name === 'ValidationError') {
        const validationErrors = Object.values(error.errors).map(
          (err: any) => err.message,
        );
        throw new BadRequestException({
          success: false,
          message: 'Validation Failed',
          error: `Invalid intput: ${validationErrors.join(', ')}`,
        });
      } else {
        //Unexpected Error
        throw new HttpException(
          {
            success: false,
            message: 'Blog not Created',
            error: 'An unexpected error occured',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  //Retrieve Blogs
  async findAll() {
    try {
      const blogs = await this.blogPostModel.find();
      return {
        success: true,
        message: 'Blog List',
        data: blogs,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          sucess: false,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

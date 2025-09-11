import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BlogPost, BlogPostDocument } from './schemas/blogPost.schema';
import { Model } from 'mongoose';
import { CreateBlogPostDto } from './dto/create-blogpost.dto';
import { FindBlogPostDto } from './dto/find-blogpost.dto';
import { UpdateBlogPostDto } from './dto/update-blogpost.dto';

@Injectable()
export class BlogPostService {
  constructor(
    @InjectModel(BlogPost.name) private blogPostModel: Model<BlogPostDocument>,
  ) {}
  //Create new blog post
  async create(data: CreateBlogPostDto) {
    try {
      const newBlogPost = await this.blogPostModel.create({ ...data });
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
  async findAll(limit?: number) {
    try {
      const blogs = await this.blogPostModel
        .find({ is_deleted: false })
        .populate('category')
        .sort({ date_created: -1 });
      if (limit) {
        blogs.splice(limit);
      }
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

  // Retreive specific Blog
  async findOne(id: any) {
    try {
      const blog = await this.blogPostModel.findById(id).populate('category');
      return {
        success: true,
        message: 'Blog found',
        data: blog,
      };
    } catch (error) {
      console.error('error finding blog', error);
      if (error.name === 'CastError') {
        throw new NotFoundException({
          success: false,
          message: 'blog not Found',
        });
      }
      throw new HttpException(
        {
          success: false,
          message: 'Error fetching blog Details',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOneBySlug(slug: any) {
    try {
      const blog = await this.blogPostModel
        .findOne({ slug })
        .populate('category');
      return {
        success: true,
        message: 'Blog found',
        data: blog,
      };
    } catch (error) {
      console.error('error finding blog', error);
      if (error.name === 'CastError') {
        throw new NotFoundException({
          success: false,
          message: 'blog not Found',
        });
      }
      throw new HttpException(
        {
          success: false,
          message: 'Error fetching blog Details',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateOne(id: string, data: UpdateBlogPostDto) {
    try {
      const updatedBlog = await this.blogPostModel.findByIdAndUpdate(
        id,
        { ...data },
        { new: true, runValidators: true },
      );
      return {
        success: true,
        data: updatedBlog,
        message: 'Blog Updated',
      };
    } catch (error) {
      // console.error('Error updating user', error);

      if (error.name === 'CastError') {
        throw new NotFoundException({
          success: false,
          message: 'Blog not Found',
        });
      }
      throw new HttpException(
        {
          success: false,
          message: 'Failed to Update Blog',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

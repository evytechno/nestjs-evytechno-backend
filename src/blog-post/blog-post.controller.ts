import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { BlogPostService } from './blog-post.service';
import { CreateBlogPostDto } from './dto/create-blogpost.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('blog')
export class BlogPostController {
  constructor(private readonly blogPostService: BlogPostService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('banner', {
      storage: diskStorage({
        destination: './uploads/blog_images',
        filename: (req, banner, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueSuffix}${extname(banner.originalname)}`);
        },
      }),
    }),
  )
  create(
    @UploadedFile() banner: Express.Multer.File,
    @Body() body: CreateBlogPostDto,
  ) {
    console.log(body);
    console.log('File : {', banner, '}');
    const bannerImage = banner ? banner.filename : null;

    return this.blogPostService.create(body, bannerImage);
  }

  @Get()
  find() {
    return this.blogPostService.findAll();
  }
}

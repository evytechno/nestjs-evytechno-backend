import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { BlogPostService } from './blog-post.service';
import { CreateBlogPostDto } from './dto/create-blogpost.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
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
    return this.blogPostService.findAll();
  }

  @Put(`:id`)
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
  update(
    @Param(`id`) id: string,
    @Body() body: UpdateBlogPostDto,
    @UploadedFile() banner: Express.Multer.File,
  ) {
    const bannerImage = banner ? banner.filename : null;
    return this.blogPostService.updateOne(id, body, bannerImage);
  }

  // @Get()
  // findOne(@Param(`id`) id: string) {
  //   return this.blogPostService.findOne(id);
  // }
}

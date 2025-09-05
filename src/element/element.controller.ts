import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ElementService } from './element.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateElementDto } from './dto/create-element.dto';
import { extname } from 'path';
import { UpdateElementDto } from './dto/update-element.dto';

@Controller('element')
export class ElementController {
  constructor(private readonly elementService: ElementService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/element/image',
        filename: (req, image, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueSuffix}${extname(image.originalname)}`);
        },
      }),
    }),
  )
  @UseInterceptors(
    FileInterceptor('icon', {
      storage: diskStorage({
        destination: './uploads/element/icon',
        filename: (req, icon, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueSuffix}${extname(icon.originalname)}`);
        },
      }),
    }),
  )
  create(
    @UploadedFile() image: Express.Multer.File,
    // @UploadedFile() icon: Express.Multer.File,
    @Body() body: CreateElementDto,
  ) {
    const imageFile = image ? image.filename : null;
    const iconFile = image ? image.filename : null;

    // const iconFile = icon ? icon.filename : null;

    return this.elementService.create(body, imageFile, iconFile);
  }

  @Get()
  find(@Query() query: any) {
    if (query?.service) {
      return this.elementService.findByService(query.service);
    }
    return this.elementService.findAll();
  }

  @Put(`:id`)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/element/image',
        filename: (req, image, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueSuffix}${extname(image.originalname)}`);
        },
      }),
    }),
  )
  @UseInterceptors(
    FileInterceptor('icon', {
      storage: diskStorage({
        destination: './uploads/element/icon',
        filename: (req, icon, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueSuffix}${extname(icon.originalname)}`);
        },
      }),
    }),
  )
  update(
    @Param(`id`) id: string,
    @Body() body: UpdateElementDto,
    @UploadedFile() image: Express.Multer.File,
    @UploadedFile() icon: Express.Multer.File,
  ) {
    const imageFile = image ? image.filename : null;
    const iconFile = image ? image.filename : null;
    return this.elementService.updateOne(id, body, imageFile, iconFile);
  }
}

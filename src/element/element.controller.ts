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
  async create(@Body() body: CreateElementDto) {
    return this.elementService.create(body);
    // return await this.elementService.create(body);
  }

  @Get()
  find(@Query() query: any) {
    if (query?.service) {
      return this.elementService.findByService(query.service);
    }
    if (query?.id) {
      return this.elementService.findOne(query.id);
    }
    return this.elementService.findAll();
  }

  @Put(`:id`)
  update(@Param(`id`) id: string, @Body() body: UpdateElementDto) {
    return this.elementService.updateOne(id, body);
  }
}

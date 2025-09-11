import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { PagesService } from './pages.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

@Controller('pages')
export class PagesController {
  constructor(private readonly pageService: PagesService) {}

  @Post()
  async create(@Body() body: CreatePageDto) {
    return this.pageService.create(body);
  }

  @Get()
  find(@Query() query: any) {
    if (query?.id) {
      return this.pageService.findOne(query.id);
    }
    return this.pageService.findAll();
  }

  @Get(`:slug`)
  findOne(@Param(`slug`) slug: string) {
    return this.pageService.findOneBySlug(slug);
  }

  @Put(`:id`)
  update(@Param(`id`) id: string, @Body() body: UpdatePageDto) {
    return this.pageService.updateOne(id, body);
  }
}

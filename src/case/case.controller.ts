import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CaseService } from './case.service';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';

@Controller('case')
export class CaseController {
  constructor(private readonly caseService: CaseService) {}

  @Post()
  async create(@Body() body: CreateCaseDto) {
    return this.caseService.create(body);
  }

  @Get()
  find(@Query() query: any) {
    if (query?.category) {
      return this.caseService.findByCategory(query.category);
    }
    if (query?.id) {
      return this.caseService.findOne(query.id);
    }
    // if (query?.slug) {
    //   return this.caseService.findOne(query.slug);
    // }
    return this.caseService.findAll();
  }

  @Get(`:slug`)
  findOne(@Param(`slug`) slug: string) {
    return this.caseService.findOnebySlug(slug);
  }

  @Put(`:id`)
  update(@Param(`id`) id: string, @Body() body: UpdateCaseDto) {
    return this.caseService.updateOne(id, body);
  }
}

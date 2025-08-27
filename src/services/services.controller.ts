import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { Services } from './schemas/services.schema';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  create(@Body() body: Partial<Services>) {
    return this.servicesService.create(body);
  }

  @Get()
  findAll() {
    return this.servicesService.findAll();
  }
  @Get(`:id`)
  findOne(@Param(`id`) id: string) {
    return this.servicesService.findOne(id);
  }

  @Put(`:id`)
  update(@Param(`id`) id: string, @Body() body: Partial<Services>) {
    return this.servicesService.updateOne(id, body);
  }

  @Delete(`:id`)
  delete(@Param(`id`) id: string) {
    return this.servicesService.deleteOne(id);
  }
}

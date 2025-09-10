import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { Services } from './schemas/services.schema';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('services')
// @UseGuards(JwtAuthGuard)
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  create(@Body() body: CreateServiceDto) {
    return this.servicesService.create(body);
  }

  @Get()
  find(@Query() query: any) {
    if (query?.id) {
      return this.servicesService.findOne(query.id);
    }
    return this.servicesService.findAll();
  }

  @Put(`:id`)
  update(@Param(`id`) id: string, @Body() body: UpdateServiceDto) {
    return this.servicesService.updateOne(id, body);
  }

  // @Delete(`:id`)
  // delete(@Param(`id`) id: string) {
  //   return this.servicesService.deleteOne(id);
  // }
}

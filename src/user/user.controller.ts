import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schemas';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // create(@Body() body: CreateUserDto) {
  //   return this.userService.create(body);
  // }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Get(`:id`)
  findOne(@Param(`id`) id: string) {
    return this.userService.findOne(id);
  }

  @Put(`:id`)
  update(@Param(`id`) id: string, @Body() body: UpdateUserDto) {
    return this.userService.updateOne(id, body);
  }

  @Delete(`:id`)
  delete(@Param(`id`) id: string) {
    return this.userService.deleteOne(id);
  }
}

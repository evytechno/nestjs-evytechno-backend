import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { UpdateSettingsDto } from './dto/update-setting.dto';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  async find() {
    return this.settingsService.findAll();
  }

  @Put(`:id`)
  async update(@Param(`id`) id: string, @Body() body: UpdateSettingsDto) {
    return this.settingsService.updateOne(id, body);
  }
}

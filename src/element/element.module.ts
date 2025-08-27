import { Module } from '@nestjs/common';
import { ElementService } from './element.service';
import { ElementController } from './element.controller';

@Module({
  providers: [ElementService],
  controllers: [ElementController]
})
export class ElementModule {}

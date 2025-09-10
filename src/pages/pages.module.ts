import { Module } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PagesController } from './pages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pages, PagesSchema } from './schema/pages.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pages.name, schema: PagesSchema }]),
  ],
  providers: [PagesService],
  controllers: [PagesController],
})
export class PagesModule {}

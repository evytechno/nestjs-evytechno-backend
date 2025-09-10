import { Module } from '@nestjs/common';
import { FileUploadsService } from './file-uploads.service';
import { FileUploadsController } from './file-uploads.controller';

@Module({
  providers: [FileUploadsService],
  controllers: [FileUploadsController]
})
export class FileUploadsModule {}

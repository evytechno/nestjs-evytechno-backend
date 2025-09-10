import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileUploadsService } from './file-uploads.service';

@Controller('upload')
export class FileUploadsController {
  private readonly host: string = process.env.HOST || 'evy';
  private readonly port: string = process.env.PORT || '4000';
  private readonly baseUrl: string = `http://${this.host}:${this.port}`;

  constructor(private readonly uploadService: FileUploadsService) {}
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueName = Date.now() + extname(file.originalname);
          callback(null, uniqueName);
        },
      }),
    }),
  ) // "file" must match FormData key
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const savedFile = this.uploadService.saveFile(file.filename, file.path);

    console.log('>>> 33', this.host, this.port, 'BaseUrl', this.baseUrl);

    return {
      message: 'File uploaded successfully',
      file: {
        ...savedFile,
        base: this.baseUrl,
        url: `${this.baseUrl}/uploads/${file.filename}`,
      },
    };
  }
}

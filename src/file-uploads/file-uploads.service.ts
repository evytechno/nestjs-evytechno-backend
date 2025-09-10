import { Injectable } from '@nestjs/common';

@Injectable()
export class FileUploadsService {
  private uploads: any[] = []; // mock DB, replace with actual DB integration

  saveFile(filename: string, path: string) {
    const record = { id: Date.now().toString(), filename, path };
    this.uploads.push(record);
    return record;
  }

  //   getAllFiles() {
  //     return this.uploads.map((file) => ({
  //       ...file,
  //       url: `${baseUrl}/uploads/${file.filename}`, // public URL
  //     }));
  //   }

  //   getFilesByPost(postId: string) {
  //     return this.uploads
  //       .filter((file) => file.postId === postId)
  //       .map((file) => ({
  //         ...file,
  //         url: `${baseUrl}/${file.filename}`,
  //       }));
  //   }
}

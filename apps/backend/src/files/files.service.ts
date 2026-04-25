import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class FilesService {
  private readonly logger = new Logger(FilesService.name);

  async deleteFileByUrl(fileUrl: string) {
    if (!fileUrl) return;

    try {
      const fileName = fileUrl.split('/').pop();
      if (!fileName) return;

      const filePath = path.join(process.cwd(), 'uploads', fileName);

      await fs.access(filePath);
      await fs.unlink(filePath);

      this.logger.log(`Deleted file: ${fileName}`);
    } catch (error) {
      this.logger.warn(`Could not delete file at ${fileUrl}: ${error}`);
    }
  }
}

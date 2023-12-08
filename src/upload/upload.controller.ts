import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Res,
  Get,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { UploadService } from './upload.service';
import { Express } from 'express';

@Controller('file')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      return await this.uploadService.uploadFile(file, res);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  @Get('/preview/:id')
  async previewFile(@Param('id') id: string, @Res() res: Response) {
    try {
      return await this.uploadService.previewFile(id, res);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

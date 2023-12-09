import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Res,
  Req,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response, Request } from 'express';
import { Express } from 'express';
import { ZohoService } from './zoho.service';

@Controller('zoho')
export class ZohoController {
  constructor(private zohoService: ZohoService) {}

  @Post('/createDocument')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file, @Res() res: Response, @Req() req) {
    try {
      let data = req.body;
      let recipents = {
        role2_email: data.role2_email,
        role2_name: data.role2_name,
        role3_email: data.role3_email,
        role3_name: data.role3_name,
      };
      return await this.zohoService.createDocument(file, res, req, recipents);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  @Post('/signDocument/:id')
  async signDocument(@Param('id') id, @Res() res: Response) {
    try {
      await this.zohoService.signDocument(id, res);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

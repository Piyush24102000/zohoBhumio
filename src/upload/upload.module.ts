import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Upload, uploadSchema } from './schema/upload.schema';
import { UploadController } from './upload.controller';

@Module({
  providers: [UploadService],
  imports: [
    MongooseModule.forFeature([{ name: Upload.name, schema: uploadSchema }]),
  ],
  controllers:[UploadController]
})
export class UploadModule {}

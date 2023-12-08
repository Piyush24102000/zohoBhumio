import { Module } from '@nestjs/common';
import { UploadModule } from './upload/upload.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UploadModule,
    MongooseModule.forRoot(
      'mongodb+srv://piyush:piyushrajutale@cluster0.qq9et69.mongodb.net/Zoho',
    ),
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { UploadModule } from './upload/upload.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ZohoService } from './zoho/zoho.service';
import { ZohoController } from './zoho/zoho.controller';
import { ZohoModule } from './zoho/zoho.module';

@Module({
  imports: [
    UploadModule,
    MongooseModule.forRoot(
      'mongodb+srv://piyush:piyushrajutale@cluster0.qq9et69.mongodb.net/Zoho',
    ),
    ZohoModule,
  ],
  providers: [ZohoService],
  controllers: [ZohoController],
})
export class AppModule {}

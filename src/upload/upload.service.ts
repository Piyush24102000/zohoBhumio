import { BadRequestException, Res, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Upload } from './schema/upload.schema';
import { Response } from 'express';
import { S3 } from 'aws-sdk';

@Injectable()
export class UploadService {
  constructor(@InjectModel(Upload.name) private uploadModel: Model<Upload>) {}

  async uploadFile(file: any, @Res() res: Response) {
    try {
      if (!file) {
        throw new BadRequestException('No file uploaded.');
      }
      // Initialize AWS S3
      const s3 = new S3({
        accessKeyId: '',
        secretAccessKey: '',
      });
      const bucketName = 'zohobhumio';
      const objectKey = `originalFiles/${file.originalname}`;

      // Upload the file to S3
      const uploadParams = {
        Bucket: bucketName,
        Key: objectKey,
        Body: file.buffer,
        ACL: 'public-read', // Set ACL for public read access
      };
      /* Business logic */
      const uploadResult = await s3.upload(uploadParams).promise();
      const s3Link = uploadResult.Location;

      // upload the s3 Link to DB
      await this.uploadModel.create({
        fileName: file.originalname,
        uploadLink: s3Link,
      });
      return res.status(201).json({ message: 'File Uploaded Successfully' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async previewFile(id: string, @Res() res: Response) {
    try {
      let file = await this.uploadModel
        .findById(id)
        .select({ uploadLink: 1, _id: 0 });
      return res.status(200).json({ message: file });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

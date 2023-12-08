import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type uploadDocument = HydratedDocument<Upload>;

@Schema()
export class Upload {
  @Prop()
  fileName: string;

  @Prop()
  uploadLink: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const uploadSchema = SchemaFactory.createForClass(Upload);

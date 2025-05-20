import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class BookSchema {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  author: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  createdBy: mongoose.Types.ObjectId;
}

export type BookDocument = BookSchema & mongoose.Document;

export const BookmarkSchema = SchemaFactory.createForClass(BookSchema);

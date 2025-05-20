import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Users {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;
}

export type UserDocument = Users & Document;

export const UserSchema = SchemaFactory.createForClass(Users);

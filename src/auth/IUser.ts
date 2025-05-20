import { IsNotEmpty, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class IUSER {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  password: string;
}

export interface ISigninToken {
  _id: mongoose.Types.ObjectId;
  username: string;
}

export interface IJwtPayload {
  _id: mongoose.Types.ObjectId;
  username: string;
  iat: number;
  exp: number;
}

export interface IGetUser {
  _id: mongoose.Types.ObjectId;
}

export interface IUserUpdate {
  username?: string;
}

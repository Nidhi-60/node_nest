import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { UserDocument } from '../schema/user.schema';
import { IJwtPayload, ISigninToken, IUSER } from './IUser';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private User: Model<UserDocument>,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async signIn(
    body: IUSER,
  ): Promise<{ success: boolean; user?: any; token: any; error?: any }> {
    try {
      const userData = await this.User.findOne({
        username: body.username,
      });

      if (userData) {
        const verifyPassword = await argon.verify(
          userData?.password,
          body.password,
        );

        if (!verifyPassword) {
          return { success: false, error: 'Invalid password', token: null };
        }
      }

      if (!userData) {
        return {
          success: false,
          user: null,
          error: 'Signin failed',
          token: null,
        };
      }

      const accessToken = await this.signToken({
        _id: userData?._id as mongoose.Types.ObjectId,
        username: userData?.username,
      });

      return {
        success: true,
        user: { username: userData?.username, _id: userData?._id },
        token: accessToken,
        error: [],
      };
    } catch (e) {
      return {
        success: false,
        user: null,
        error: 'Something went wrong',
        token: null,
      };
    }
  }

  async signUp(
    body: IUSER,
  ): Promise<{ success: boolean; user?: any; error?: any }> {
    try {
      const hasPassword = await argon.hash(body.password);

      const createUser = await this.User.create({
        username: body.username,
        password: hasPassword,
      });

      if (!createUser) {
        return { success: false, user: null, error: 'Error creating user' };
      }

      return {
        success: true,
        user: { username: createUser.username, _id: createUser._id },
        error: [],
      };
    } catch (e) {
      return { success: false, user: null, error: 'Something went wrong' };
    }
  }

  async signToken(data: ISigninToken): Promise<string> {
    const secret: string | undefined = this.config.get('JWT_SECRET');

    const token = await this.jwtService.signAsync(data, {
      expiresIn: '15m',
      secret: secret,
    });

    return token;
  }

  async validateUser(payload: IJwtPayload): Promise<any> {
    try {
      if (payload) {
        return await this.User.findOne({ username: payload?.username }).select({
          password: 0,
        });
      }
    } catch (e) {
      return { success: false, user: null, error: 'Something went wrong' };
    }
  }
}

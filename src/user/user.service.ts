import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IGetUser, IUserUpdate } from 'src/auth/IUser';
import { UserDocument } from 'src/schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private User: Model<UserDocument>) {}

  async userList(): Promise<{ list?: any[]; success?: boolean; error?: any }> {
    try {
      const userList = await this.User.find({}).select({ password: 0 });

      if (userList) {
        return { list: userList, success: true };
      } else {
        return { success: false, error: 'No user found' };
      }
    } catch (e) {
      return { success: false, error: e };
    }
  }

  async getUserById(id: IGetUser): Promise<{ item: any; error: any }> {
    try {
      const user = await this.User.findById(id).select({ password: 0 });

      if (user) {
        return { item: user, error: null };
      } else {
        return { item: null, error: 'No User found' };
      }
    } catch (e) {
      return { item: null, error: e };
    }
  }

  async deleteUserById(
    id: IGetUser,
  ): Promise<{ success: boolean; error: any }> {
    try {
      const user = await this.User.deleteOne({ _id: id });

      if (user) {
        return { success: true, error: null };
      } else {
        return { success: false, error: 'No User found' };
      }
    } catch (e) {
      return { success: false, error: e };
    }
  }

  async updateUser(
    id: IGetUser,
    data: IUserUpdate,
  ): Promise<{ success: boolean; error: any }> {
    try {
      const res = await this.User.updateOne({ _id: id }, { $set: data });

      if (res) {
        return { success: true, error: null };
      } else {
        return { success: false, error: 'No User found' };
      }
    } catch (e) {
      return { success: false, error: e };
    }
  }
}

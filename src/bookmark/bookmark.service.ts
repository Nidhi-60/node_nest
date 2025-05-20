import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IBookCreate, IBookId } from 'src/interface/Bookmark';
import { BookDocument } from 'src/schema/book.schema';

@Injectable()
export class BookmarkService {
  constructor(@InjectModel('Book') private Book: Model<BookDocument>) {}

  async create(
    body: IBookCreate,
  ): Promise<{ success: boolean; data: any; err: any }> {
    try {
      const newBook = await this.Book.create(body);

      if (newBook) {
        return { success: true, data: newBook, err: null };
      } else {
        return { success: false, data: null, err: 'Error creating book' };
      }
    } catch (e) {
      return { success: false, data: null, err: e.message };
    }
  }

  async list(): Promise<{ success: boolean; data: any; err: any }> {
    try {
      const books = await this.Book.find({});
      return { success: true, data: books, err: null };
    } catch (e) {
      return { success: false, data: null, err: e.message };
    }
  }

  async update(
    id: IBookId,
    data: IBookCreate,
  ): Promise<{ success: boolean; error: any }> {
    try {
      const res = await this.Book.updateOne({ _id: id }, { $set: data });

      if (res) {
        return { success: true, error: null };
      } else {
        return { success: false, error: 'No User found' };
      }
    } catch (e) {
      return { success: false, error: e };
    }
  }

  async delete(id: IBookId): Promise<{ success: boolean; error: any }> {
    try {
      const user = await this.Book.deleteOne({ _id: id });

      if (user) {
        return { success: true, error: null };
      } else {
        return { success: false, error: 'No User found' };
      }
    } catch (e) {
      return { success: false, error: e };
    }
  }
}

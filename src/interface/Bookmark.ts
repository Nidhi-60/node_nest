import mongoose from 'mongoose';

export interface IBookCreate {
  title?: string;
  author?: string;
  description?: string;
  createdBy?: mongoose.Types.ObjectId;
}

export interface IBookId {
  _id: mongoose.Types.ObjectId;
}

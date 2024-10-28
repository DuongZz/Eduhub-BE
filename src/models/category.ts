import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { ICategory } from './../interfaces/categoryInterface';

export interface ICategoryModel extends ICategory, Document { }

const categorySchema: Schema = new Schema(
  {
    categoryId: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    categoryName: {
      type: String,
      default: ''
    },
  }
)

export default mongoose.model<ICategory>('Category', categorySchema)

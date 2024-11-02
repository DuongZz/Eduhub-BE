import { ISubCategory } from './../interfaces/subCatergoryInterface';
import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface ISubCategoryModel extends Omit<ISubCategory, '_id'>, Document { }

const subCategorySchema: Schema = new Schema(
  {
    subCategoryId: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    subCategoryName: {
      type: String,
      default: ''
    }
  }
)

export default mongoose.model<ISubCategory>('subCategory', subCategorySchema)

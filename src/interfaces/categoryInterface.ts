import { Schema, Types } from "mongoose";

export interface ICategory {
  id?: Types.ObjectId;
  categoryName: string;
  subCategories?: Types.ObjectId[];
  slug: string;
}

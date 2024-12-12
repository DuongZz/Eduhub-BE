import { Schema, Types } from "mongoose";

export interface ISubCategory {
  id?: Types.ObjectId;
  subCategoryName: string;
  parentCategorySlug: string;
  slug: string;
}

import { Schema } from "mongoose";

export interface ISubCategory {
  id: Schema.Types.ObjectId;
  subCategoryName: string
}

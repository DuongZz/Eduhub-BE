import { Schema } from "mongoose";

export interface ICategory {
  id: Schema.Types.ObjectId;
  categoryName: string
}

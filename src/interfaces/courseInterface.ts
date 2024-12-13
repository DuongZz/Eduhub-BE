import { Schema } from "mongoose";
import { RATING, PROGRESS } from "../models/type";
export interface ICourse {
  id?: Schema.Types.ObjectId;
  courseName: string
  description: string
  introduce: string;
  rating: RATING
  price: number
  content: string;
  videos: Schema.Types.ObjectId[];
  progress: PROGRESS
  approvedBy: Schema.Types.ObjectId;
  slug: string;
  sold: number;
  view: number;
  discount: number;
  category: string;
  subCategories: string;
}

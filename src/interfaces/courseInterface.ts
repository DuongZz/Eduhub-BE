import { Schema } from "mongoose";
import { RATING, LEVEL, PROGRESS } from "../models/type";
export interface ICourse {
  id: Schema.Types.ObjectId;
  courseName: string
  description: string
  rating: RATING
  level: LEVEL
  price: number
  content: Schema.Types.ObjectId[];
  progress: PROGRESS
  approvedBy: Schema.Types.ObjectId;
}

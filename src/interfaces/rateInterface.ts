import { Schema } from "mongoose";

export interface IRate {
  id: Schema.Types.ObjectId;
  rating: string;
  content: string;
  course: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
}


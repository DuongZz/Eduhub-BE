import { Schema, Types } from "mongoose";

export interface IChat {
  id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  role: string;
  message: string;
}

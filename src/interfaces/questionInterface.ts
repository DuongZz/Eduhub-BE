import { Schema } from "mongoose";

export interface IQuestion {
  id: Schema.Types.ObjectId;
  questionText: string;
  answer: Schema.Types.ObjectId[];
  maxScore: Number;
}

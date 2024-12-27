import { Schema } from "mongoose";

export interface IAnswer {
  id: Schema.Types.ObjectId;
  text: string;
  isCorrect: boolean;
}

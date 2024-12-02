import { Schema } from "mongoose";

export interface IAnswer {
  id: Schema.Types.ObjectId;
  answerText: string;
  isCorrect: boolean;
}

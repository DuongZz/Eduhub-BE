import { Schema } from "mongoose";

export interface IQuizAnswer {
  questionId: Schema.Types.ObjectId;
  answerId: Schema.Types.ObjectId;
  isCorrect: boolean;
}

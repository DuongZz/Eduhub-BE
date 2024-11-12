import { Schema } from "mongoose";

export interface IQuiz {
  id: Schema.Types.ObjectId;
  question: string
  response: string
  answer: Schema.Types.ObjectId[]
  maxScore: number
  durationTime: number
}


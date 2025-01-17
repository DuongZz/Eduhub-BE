import { Schema } from "mongoose";
import { IQuizAnswer } from "./quizAnswerInterface";

export interface IQuizAttempt {
  id: Schema.Types.ObjectId;
  learnerId: Schema.Types.ObjectId
  quizId: Schema.Types.ObjectId
  answers: IQuizAnswer[];
  pointAchieved: number
  conditionPass: number
  isPassed: boolean
}

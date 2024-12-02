import { Schema } from "mongoose";

export interface IQuizAttempt {
  id: Schema.Types.ObjectId;
  learnerId: Schema.Types.ObjectId
  quizId: Schema.Types.ObjectId
  pointAchieved: number
  conditionPass: number
  isPassed: boolean
}

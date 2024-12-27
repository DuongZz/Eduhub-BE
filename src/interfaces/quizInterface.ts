import { Schema } from "mongoose";

export interface IQuiz {
  id: Schema.Types.ObjectId;
  quizName: string;
  instructorId: Schema.Types.ObjectId;
  courseId: Schema.Types.ObjectId;
  questions: string;
  durationTime: number;
  maxScore: number;
}


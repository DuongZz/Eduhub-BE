import mongoose, { Document, mongo, Schema } from 'mongoose';
import { IQuizAttempt } from '../interfaces/quizAttemptInterface';

export interface IQuizAttemptModel extends IQuizAttempt, Document { }

const quizAttemptSchema: Schema = new Schema(
  {
    learnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      unique: true,
    },
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      unique: true
    },
    pointAchieved: {
      type: Number,
      default: 0
    },
    conditionPass: {
      type: Number,
      default: 7
    },
    isPassed: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

export default mongoose.model<IQuizAttempt>('QuizAttempt', quizAttemptSchema)

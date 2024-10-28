import { IQuiz } from './../interfaces/quizInterface';
import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IQuizModel extends IQuiz, Document { }

const quizSchema: Schema = new Schema(
  {
    quizId: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    question: {
      type: String,
      default: ''
    },
    response: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Answer',
      required: true,
    },
    answer: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer',
      },
    ],
    maxScore: {
      type: Number,
      required: true,
    },
    durationTime: {
      type: Number,
      required: true,
    },
  }
)

export default mongoose.model<IQuiz>('Quiz', quizSchema)

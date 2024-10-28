// models/answerModel.ts
import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { IAnswer } from '../interfaces/answerInterface';

export interface IAnswerModel extends IAnswer, Document { }

const answerSchema: Schema = new Schema(
  {
    answerId: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    text: {
      type: String,
      required: true,
    },
    correct: {
      type: Boolean,
      required: true,
    },
  },
);

export default mongoose.model<IAnswerModel>('Answer', answerSchema);

import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { PROGRESS } from './type';
import { ILesson } from '../interfaces/lessonInterface';

export interface ILessonModel extends Omit<ILesson, '_id'>, Document { }
const lessonSchema: Schema = new Schema(
  {
    lessonId: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    lessonName: {
      type: String,
      default: '',
    },
    lessonContent: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
)

export default mongoose.model<ILesson>('Lesson', lessonSchema)

import { ICourse } from './../interfaces/courseInterface';
import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { LEVEL, PROGRESS, RATING } from './type';

export interface ICourseModel extends ICourse, Document { }

const courseSchema: Schema = new Schema(
  {
    courseId: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    courseName: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    rating: {
      type: String,
      enum: Object.values(RATING),
      default: null,
    },
    level: {
      type: String,
      enum: Object.values(LEVEL),
      default: ''
    },
    price: {
      type: Number,
      default: 0,
    },
    content: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
        required: true,
      }
    ],
    progress: {
      type: String,
      enum: Object.values(PROGRESS)
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

export default mongoose.model<ICourse>('Course', courseSchema)

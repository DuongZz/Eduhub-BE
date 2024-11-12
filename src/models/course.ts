import mongoose, { Schema } from 'mongoose';
import { LEVEL, PROGRESS, RATING } from './type';


const courseSchema: Schema = new Schema(
  {
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
      required: false,
      default: RATING.ZERO
    },
    level: {
      type: String,
      enum: Object.values(LEVEL),
      required: false,
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
        default: []
      }
    ],
    progress: {
      type: String,
      enum: Object.values(PROGRESS),
      required: false,
      default: PROGRESS.INCOMPLETE
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

export default mongoose.model('Course', courseSchema)

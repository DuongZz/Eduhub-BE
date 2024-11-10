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

export default mongoose.model('Course', courseSchema)

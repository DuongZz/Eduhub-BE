import mongoose, { Schema } from 'mongoose';
import { PROGRESS, RATING } from './type';


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
    price: {
      type: Number,
      default: 0,
    },
    content: {
      type: String,
      required: true
    },
    videos: [
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
    slug: {
      type: String,
      default: '',
      unique: true
    },
    sold: {
      type: Number,
      default: 0
    },
    view: {
      type: Number,
      default: 0
    },
    discount: {
      type: Number,
      default: 0
    },
    category: {
      type: String,
      ref: 'Category',
      required: true,
    },
    subCategories: [
      {
        type: String,
        ref: 'Category',
        required: true
      }
    ],
  },
  { timestamps: true }
)

export default mongoose.model('Course', courseSchema)

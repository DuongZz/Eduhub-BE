import mongoose, { Schema } from 'mongoose';
import { APPROVAL_STATUS, PROGRESS, RATING } from './type';


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
    introduce: {
      type: String,
      default: ''
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
    },
    subCategories: [
      {
        type: String,
        ref: 'Category',
      }
    ],
    approvalStatus: {
      type: String,
      enum: Object.values(APPROVAL_STATUS),
      default: APPROVAL_STATUS.PENDING
    },
    ratingNum: {
      type: Number,
      default: 0
    },
    poster: {
      type: String,
    }
  },
  { timestamps: true }
)

export default mongoose.model('Course', courseSchema)

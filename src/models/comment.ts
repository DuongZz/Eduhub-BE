import mongoose, { Schema } from 'mongoose';
import { RATING } from './type';

const commentSchema: Schema = new Schema(
  {
    commentContent: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    replyComment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reply',
        default: []
      }
    ],
    commentedDate: {
      type: Date,
      default: Date.now
    },
    number_of_like: {
      type: Number,
      default: 0
    },
    number_of_dislike: {
      type: Number,
      default: 0
    }
  }
)

export default mongoose.model('Comment', commentSchema);


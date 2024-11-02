import { IComment } from './../interfaces/commentInterface';
import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
export interface ICommentModel extends Omit<IComment, '_id'>, Document { }

const commentSchema: Schema = new Schema(
  {
    commentId: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    commentContent: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    discussionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Discussion',
      required: true,
    },
    replyComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reply',
      required: true,
    },
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

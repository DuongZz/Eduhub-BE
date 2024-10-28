import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { IReply } from '../interfaces/replyInterface';

export interface IReplyModel extends IReply, Document { }

const replySchema: Schema = new Schema(
  {
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      required: true,
    },
    replyId: {
      type: String,
      default: uuidv4,
      unique: true
    },
    replyContent: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reply_date: {
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
    },
  }
)

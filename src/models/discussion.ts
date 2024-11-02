import { IDiscussion } from './../interfaces/discussionInterface';
import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IDiscussionModel extends Omit<IDiscussion, '_id'>, Document { }
const discussionSchema: Schema = new Schema(
  {
    discussionId: {
      type: String,
      default: uuidv4,
      unique: true
    },
    discussionTopic: {
      type: String,
      default: ''
    },
    discussionContent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      required: true,
    }
  },
)

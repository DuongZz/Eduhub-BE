import mongoose, { Schema } from 'mongoose';

const commentSchema: Schema = new Schema(
  {
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

export default mongoose.model('Comment', commentSchema);


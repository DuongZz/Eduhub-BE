import mongoose, { Schema } from 'mongoose';

const discussionSchema: Schema = new Schema(
  {
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

export default mongoose.model('Discussion', discussionSchema)

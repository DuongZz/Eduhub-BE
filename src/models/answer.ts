import mongoose, { Schema } from 'mongoose';

const answerSchema: Schema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    correct: {
      type: Boolean,
      required: true,
    },
  },
);

export default mongoose.model('Answer', answerSchema);

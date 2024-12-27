import mongoose, { Schema } from 'mongoose';

const answerSchema: Schema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    isCorrect: {
      type: Boolean,
      required: true,
    },
  },
);

export default mongoose.model('Answer', answerSchema);

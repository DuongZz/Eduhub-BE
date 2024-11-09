// models/answerModel.ts
import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const answerSchema: Schema = new Schema(
  {
    answerId: {
      type: String,
      default: uuidv4,
      unique: true,
    },
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

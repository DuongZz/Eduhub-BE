import mongoose, { Schema } from 'mongoose';
import { STATUS } from './type'

const ApplicationSchema: Schema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    cv: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    linkFb: {
      type: String,
      default: '',
    },
    experience: {
      type: String,
      default: '',
    },
    topic: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: STATUS,
      default: 'Pending',
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Application', ApplicationSchema);

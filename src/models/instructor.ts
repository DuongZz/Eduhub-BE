import mongoose, { Schema } from 'mongoose';

// DEFINE INSTRUCTOR SCHEMA
const InstructorSchema: Schema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    description: {
      type: String,
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
      default: ''
    },
    experience: {
      type: String,
      default: ''
    },
    topic: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

// EXPORT
export default mongoose.model('Instructor', InstructorSchema);

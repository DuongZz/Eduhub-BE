import mongoose, { Schema } from 'mongoose';

const lessonSchema: Schema = new Schema(
  {
    lessonName: {
      type: String,
      default: '',
    },
    lessonContent: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
)

export default mongoose.model('Lesson', lessonSchema)

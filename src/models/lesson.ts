import mongoose, { Schema } from 'mongoose';

const lessonSchema: Schema = new Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    },
    lessonName: {
      type: String,
      required: true,
    },
    lessonContent: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      default: '',
    }
  },
  { timestamps: true }
)

export default mongoose.model('Lesson', lessonSchema)

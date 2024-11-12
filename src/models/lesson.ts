import mongoose, { Schema } from 'mongoose';

const lessonSchema: Schema = new Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    },
    lessonName: {
      type: String,
      require: true,
    },
    lessonContent: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Lesson', lessonSchema)

import mongoose, { Schema } from 'mongoose';

const quizSchema: Schema = new Schema(
  {
    quizName: {
      type: String,
      required: true,
    },
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Instructor',
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
      }
    ],
    durationTime: {
      type: Number,
      required: false,
    },
    maxScore: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Quiz', quizSchema);

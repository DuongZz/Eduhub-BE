import mongoose, { Schema } from 'mongoose';

const quizAttemptSchema: Schema = new Schema(
  {
    learnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true,
    },
    answers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Question',
          required: true,
        },
        answerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Answer',
          required: true,
        },
        isCorrect: {
          type: Boolean,
          default: false,
        },
      }
    ],
    pointAchieved: {
      type: Number,
      default: 0,
    },
    isPassed: {
      type: Boolean,
      default: false,
    },
    conditionPass: {
      type: Number,
      default: 7,
    },
  },
  { timestamps: true }
);

export default mongoose.model('QuizAttempt', quizAttemptSchema);

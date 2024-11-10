import mongoose, { Schema } from 'mongoose';


const quizSchema: Schema = new Schema(
  {
    question: {
      type: String,
      default: ''
    },
    response: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Answer',
      required: true,
    },
    answer: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer',
      },
    ],
    maxScore: {
      type: Number,
      required: true,
    },
    durationTime: {
      type: Number,
      required: true,
    },
  }
)

export default mongoose.model('Quiz', quizSchema)

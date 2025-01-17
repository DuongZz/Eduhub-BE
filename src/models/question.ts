import mongoose, { Schema } from 'mongoose';

const questionSchema: Schema = new Schema(
    {
        questionText: {
            type: String,
            required: true,
        },
        answers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Answer',
                required: true,
            },
        ],
        maxScore: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model('Question', questionSchema);

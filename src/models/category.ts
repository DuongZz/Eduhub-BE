import mongoose, { Schema } from 'mongoose';

const categorySchema: Schema = new Schema(
  {
    categoryName: {
      type: String,
      default: ''
    },
  }
)

export default mongoose.model('Category', categorySchema)

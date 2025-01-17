import mongoose, { Schema } from "mongoose";
import { RATING } from "./type";
import Course from "./course";  // Import model Course nếu cần thiết

const rateSchema: Schema = new Schema(
  {
    rating: {
      type: String,
      enum: Object.values(RATING),
      required: true,
    },
    content: {
      type: String,
      required: false,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Rate", rateSchema);

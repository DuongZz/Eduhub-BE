import mongoose, { Schema } from "mongoose";
import { ROLE } from "./type";

const ChatSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(ROLE),
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Chat", ChatSchema);

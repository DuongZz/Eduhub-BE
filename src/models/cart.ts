import mongoose, { Schema } from "mongoose";

const cartSchema: Schema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    }
  ],
});

export default mongoose.model("Cart", cartSchema);


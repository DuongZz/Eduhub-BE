import { Schema, model } from "mongoose";

const CategorySchema: Schema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
      unique: true,
    },
    subCategories: [
      {
        type: String,
        ref: "SubCategory",
      },
    ],
    slug: {
      type: String,
      unique: true
    }
  },
  { timestamps: true }
);

export default model("Category", CategorySchema);

import mongoose, { Schema, model } from "mongoose";

const SubCategorySchema: Schema = new Schema(
  {
    subCategoryName: {
      type: String,
      required: true,
    },
    parentCategorySlug: {
      type: String,
      ref: "Category",
      required: true,
    },
    slug: {
      type: String,
      unique: true
    }
  },
  { timestamps: true }
);

export default model("SubCategory", SubCategorySchema);

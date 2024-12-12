import { ICategory } from "../../interfaces/categoryInterface";
import Category from "../../models/category";

export const createCategoryService = async (categoryData: ICategory) => {
  try {
    const newCategory = new Category(categoryData);
    await newCategory.save();
    return newCategory;
  } catch (err) {
    throw new Error(err.message);
  }
};

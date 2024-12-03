import SubCategory from "../../models/subCategory";
import Category from "../../models/category";
import { ISubCategory } from "../../interfaces/subCatergoryInterface";

export const createSubCategoryService = async (subCategoryData: ISubCategory) => {
  try {
    const category = await Category.findOne({ slug: subCategoryData.parentCategorySlug });
    if (!category) {
      throw new Error("Parent category not found");
    }

    const newSubCategory = new SubCategory({
      subCategoryName: subCategoryData.subCategoryName,
      parentCategorySlug: subCategoryData.parentCategorySlug,
      slug: subCategoryData.slug,
    });

    const savedSubCategory = await newSubCategory.save();

    category.subCategories.push(savedSubCategory.slug);
    await category.save();

    return savedSubCategory;
  } catch (err) {
    throw new Error(err.message);
  }
};

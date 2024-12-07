import { Request, Response } from "express";
import { generateSlug } from "../../utils/generateSlug";
import { createSubCategoryService } from "../../services/subCategory/createSubCategoryService";
createSubCategoryService

export const createSubCategoryController = async (req: Request, res: Response) => {
  try {
    const { subCategoryName, parentCategorySlug } = req.body;

    if (!subCategoryName || !parentCategorySlug) {
      return res.status(400).json({ message: "Missing required fields: subCategoryName or parentCategorySlug" });
    }

    const subCategory = await createSubCategoryService({
      subCategoryName,
      parentCategorySlug,
      slug: generateSlug(subCategoryName),
    });

    res.status(201).json({
      message: "SubCategory created successfully",
      subCategory,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

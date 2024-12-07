import { Request, Response } from "express";
import { generateSlug } from "../../utils/generateSlug";
import { createCategoryService } from "../../services/category/createCategoryService";

export const createCategoryController = async (req: Request, res: Response) => {
  try {
    const { categoryName, slug } = req.body;

    const category = await createCategoryService({
      categoryName,
      slug: generateSlug(categoryName),
    });

    res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

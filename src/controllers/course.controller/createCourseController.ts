import { Request, Response } from 'express';
import { createCourseService } from '../../services/course/createCourseService';
import { StatusCodes } from 'http-status-codes';
import { generateSlug } from '../../utils/generateSlug';
import Instructor from '../../models/instructor';

export const createCourseController = async (req: Request, res: Response) => {
  try {
    const {
      courseName,
      description,
      introduce,
      rating,
      price,
      content,
      videos = [],
      progress,
      slug,
      sold,
      view,
      discount,
      category,
      subCategories
    } = req.body;
    const approvedBy = req.user.id;
    const categorySlug = generateSlug(category);
    const subCategoriesSlug = subCategories.map((subCategory: string) => generateSlug(subCategory));

    const newCourse = await createCourseService({
      courseName,
      description,
      introduce,
      rating,
      price,
      content,
      videos,
      progress,
      approvedBy: approvedBy,
      slug: generateSlug(courseName),
      sold,
      view,
      discount,
      category: categorySlug,
      subCategories: subCategoriesSlug
    });


    res.status(StatusCodes.CREATED).json({
      message: 'Course created successfully',
      data: newCourse,
    });
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Error creating course',
      error: error.message,
    });
  }
};

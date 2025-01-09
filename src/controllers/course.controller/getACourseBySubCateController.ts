import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getCourseBySubCategoryService } from '../../services/course/getACourseBySubCateService';
export const getCoursesBySubCategoryController = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const { page } = req.query;

    const pageNum = page ? Number(page) : 1;

    const courses = await getCourseBySubCategoryService(slug as string, pageNum);

    if (courses.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'No courses found for this subcategory.',
      });
    }

    res.status(StatusCodes.OK).json({ courses });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || 'Error retrieving courses.',
    });
  }
};

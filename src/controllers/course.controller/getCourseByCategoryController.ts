import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { getCourseByCategoryService } from '../../services/course/getCourseByCategoryService';

export const getACourseByCategoryController = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params; // slug là tên category
    const { page } = req.query;
    const pageNum = page ? Number(page) : 1;

    // Gọi service để lấy courses và suggestedCourses
    const { courses, suggestedCourses } = await getCourseByCategoryService(slug, pageNum);

    if (!courses || courses.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'No courses found for this category',
      });
    }

    return res.status(StatusCodes.OK).json({
      message: 'Courses retrieved successfully',
      data: {
        courses,
        suggestedCourses,
      },
    });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
};

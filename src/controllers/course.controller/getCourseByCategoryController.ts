import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { getCourseByCategoryService } from '../../services/course/getCourseByCategoryService';

export const getACourseByCategoryController = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    console.log("🚀 ~ getACourseByCategoryController ~ slug:", slug)

    const courses = await getCourseByCategoryService(slug);

    if (!courses || courses.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'No courses found for this category' });
    }

    return res.status(StatusCodes.OK).json({
      message: 'Courses retrieved successfully',
      data: courses,
    });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

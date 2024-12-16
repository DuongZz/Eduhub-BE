import { Request, Response } from 'express';
import { createCourseService } from '../../services/instructor/createCourseService';
import { StatusCodes } from 'http-status-codes';
import { generateSlug } from '../../utils/generateSlug';

export const createCourseController = async (req: Request, res: Response) => {
  try {
    const { courseName } = req.body;
    const createdBy = req.user.id;
    const nameSlug = generateSlug(courseName);

    const newCourse = await createCourseService({ courseName, createdBy, slug: nameSlug });

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

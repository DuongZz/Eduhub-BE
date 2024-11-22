import { Request, Response } from 'express';
import { createCourseService } from '../../services/course/createCourseService';
import { StatusCodes } from 'http-status-codes';
import { generateSlug } from '../../utils/generateSlug';

export const createCourseController = async (req: Request, res: Response) => {
  try {
    const {
      courseName,
      description,
      rating,
      level,
      price,
      content = [],
      progress,
      slug
    } = req.body;
    const approvedBy = req.user.id;

    const newCourse = await createCourseService({
      courseName,
      description,
      rating,
      level,
      price,
      content,
      progress,
      approvedBy: approvedBy,
      slug: generateSlug(courseName)
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

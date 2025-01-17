import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { getAllCourseService } from '../../services/course/getAllCourseService';

export const getAllCourseController = async (req: Request, res: Response) => {
  try {
    const allCourse = await getAllCourseService();
    res.status(StatusCodes.OK).json(allCourse);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)
  }
}

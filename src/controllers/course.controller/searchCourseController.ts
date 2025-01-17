import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { searchCourseService } from '../../services/course/searchCourseService';

export const searchCourseController = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;
    const courses = await searchCourseService(String(name));
    res.status(StatusCodes.OK).json(courses);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}

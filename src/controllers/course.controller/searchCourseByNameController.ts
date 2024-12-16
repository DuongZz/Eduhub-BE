import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { searchCourseByNameService } from '../../services/course/searchCourseByNameService';

export const searchCourseByNameController = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;
    const courses = await searchCourseByNameService(String(name));
    res.status(StatusCodes.OK).json(courses);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}

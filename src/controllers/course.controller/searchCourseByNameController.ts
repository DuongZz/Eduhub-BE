import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { searchCourseByNameService } from '../../services/course/searchCourseByNameService';

export const searchCourseByNameController = async (req: Request, res: Response) => {
  try {
    const { name, page } = req.query;
    const pageNum = page ? Number(page) : 1;
    const courses = await searchCourseByNameService(String(name), pageNum);
    res.status(StatusCodes.OK).json({ data: courses });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}

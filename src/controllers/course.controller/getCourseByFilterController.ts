import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { getCourseByFilterService } from '../../services/course/getCourseByFilterService';

export const getCourseByFilterController = async (req: Request, res: Response) => {
  try {
    const { option, page } = req.query;
    const pageNum = page ? Number(page) : 1;

    const course = await getCourseByFilterService(option as string, pageNum);
    res.status(StatusCodes.OK).json(course)
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
};

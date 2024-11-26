import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getCourseByOptionService } from '../../services/course/getCourseByOptionsService';

export const getCourseByOptionsController = async (req: Request, res: Response) => {
  try {
    const { option, page } = req.query;

    const pageNum = page ? Number(page) : 1;

    const courses = await getCourseByOptionService(option as string, pageNum);

    res.status(StatusCodes.OK).json({ courses });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

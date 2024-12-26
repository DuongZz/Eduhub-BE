import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { getMyCourseService } from '../../services/instructor/getMyCourseService';

export const getMyCourseController = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const course = await getMyCourseService(id);
    res.status(StatusCodes.OK).json(course);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}

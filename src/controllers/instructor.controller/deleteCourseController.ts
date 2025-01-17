import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { deleteCourseService } from '../../services/instructor/deleteCourseService';

export const deleteCourseController = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const course = await deleteCourseService(courseId);
    res.status(StatusCodes.OK).json("Delete course successfully");
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}

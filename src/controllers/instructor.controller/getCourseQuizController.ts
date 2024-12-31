import { getCourseQuizService } from '../../services/instructor/getCourseQuizService';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const getCourseQuizController = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const lesson = await getCourseQuizService(courseId);
    res.status(StatusCodes.OK).json(lesson);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}

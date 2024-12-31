import { getCourseLessonService } from '../../services/instructor/getCourseLessonService';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const getCourseLessonController = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const lesson = await getCourseLessonService(courseId);
    res.status(StatusCodes.OK).json(lesson);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}

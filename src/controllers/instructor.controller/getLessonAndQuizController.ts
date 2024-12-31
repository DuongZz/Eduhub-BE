import { getLessonAndQuizService } from '../../services/instructor/getLessonAndQuizService';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const getLessonAndQuizController = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const lessonAndQuiz = await getLessonAndQuizService(courseId);
    res.status(StatusCodes.OK).json(lessonAndQuiz);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}

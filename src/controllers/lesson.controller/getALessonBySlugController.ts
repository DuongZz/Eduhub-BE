import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getALessonBySlugService } from '../../services/lesson/getALessonBySlugService';

export const getALessonBySlugController = async (req: Request, res: Response) => {
  try {
    const { courseSlug, lessonSlug } = req.params;
    const lesson = await getALessonBySlugService(courseSlug, lessonSlug);
    if (!lesson) {
      return res.status(StatusCodes.NOT_FOUND).json('Lesson not found');
    }
    return res.status(StatusCodes.OK).json(lesson)
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}

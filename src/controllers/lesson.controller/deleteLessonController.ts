import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { deleteLessonService } from '../../services/lesson/deleteLessonService';

export const deleteLessonController = async (req: Request, res: Response) => {
  try {
    const { lessonId, courseId } = req.params;
    const lesson = await deleteLessonService(lessonId, courseId);

    res.status(StatusCodes.OK).json("Xóa thành công");
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}

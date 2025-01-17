import { Request, Response } from 'express';
import { updateLessonService } from '../../services/lesson/updateLessonService';
import { StatusCodes } from 'http-status-codes';

export const updateLessonController = async (req: Request, res: Response): Promise<void> => {
  const { lessonId, courseId } = req.params;
  const updatedData = req.body;
  try {
    const updatedLesson = await updateLessonService(courseId, lessonId, updatedData);

    res.status(StatusCodes.OK).json({
      message: 'Cập nhật Lesson thành công',
      lesson: updatedLesson
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi server',
      error: (error as Error).message
    });
  }
};

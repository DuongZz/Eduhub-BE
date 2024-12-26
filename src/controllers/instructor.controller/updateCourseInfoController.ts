import { Request, Response } from 'express';
import { updateCourseInfoService } from '../../services/instructor/updateCourseInfoService';
import { StatusCodes } from 'http-status-codes';

export const updateCourseController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const courseUpdates = JSON.parse(req.body.courseUpdates);
    const file = req.file;

    const updatedCourse = await updateCourseInfoService(id, courseUpdates, file);

    res.status(StatusCodes.OK).json({
      message: 'Course updated successfully',
      data: updatedCourse,
    });
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Error updating course',
      error: error.message,
    });
  }
};

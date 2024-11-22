import { StatusCodes } from 'http-status-codes';
import { getACourseService } from '../../services/course/getACourseService';
import { Request, Response } from 'express';


export const getACourseController = async (req: Request, res: Response) => {
  try {
    const { id: courseId } = req.params;
    const course = await getACourseService(courseId)
    if (!course) {
      return res.status(StatusCodes.NOT_FOUND).json('Course not found');
    }
    return res.status(StatusCodes.OK).json(course)
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}

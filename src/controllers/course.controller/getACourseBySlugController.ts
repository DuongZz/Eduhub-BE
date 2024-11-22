import { getACourseBySlugService } from './../../services/course/getACourseBySlugService';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';


export const getACourseBySlugController = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const course = await getACourseBySlugService(slug)
    if (!course) {
      return res.status(StatusCodes.NOT_FOUND).json('Course not found');
    }
    return res.status(StatusCodes.OK).json(course)
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}

import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { getUnapprovedCourseService } from '../../services/admin/getUnapprovedCourseService';

export const getUnapprovedCourseController = async (req: Request, res: Response) => {
  try {
    const course = await getUnapprovedCourseService();
    if (!course) {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'No unapproved course' });
    }
    res.status(StatusCodes.OK).json(course);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}

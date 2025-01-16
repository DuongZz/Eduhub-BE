import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { getAllCourseAdminService } from '../../services/admin/getAllCourseAdminService';

export const getAllCourseAdminController = async (req: Request, res: Response) => {
  try {
    const { page } = req.query;
    const pageNum = page ? Number(page) : 1;

    const course = await getAllCourseAdminService(pageNum);
    res.status(StatusCodes.OK).json(course);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
} 

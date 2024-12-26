import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { searchInstructorByNameService } from '../../services/instructor/searchInstructorByNameService';

export const searchInstructorByNameController = async (req: Request, res: Response) => {
  try {
    const { name, page } = req.query;
    const pageNum = page ? Number(page) : 1;
    const instructors = await searchInstructorByNameService(String(name), pageNum);
    res.status(StatusCodes.OK).json(instructors)
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}

import { getAllInstructorService } from "../../services/instructor/getAllInstructorService";
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const getAllInstructorController = async (req: Request, res: Response) => {
  try {
    const { page } = req.query;
    const pageNum = page ? Number(page) : 1;

    const instructor = await getAllInstructorService(pageNum);
    res.status(StatusCodes.OK).json(instructor);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}

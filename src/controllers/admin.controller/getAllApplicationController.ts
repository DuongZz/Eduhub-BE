import { getAllApplicationService } from './../../services/admin/getAllApplicationService';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const getAllApplicationController = async (req: Request, res: Response) => {
  try {
    const { page } = req.query;
    const pageNum = page ? Number(page) : 1;
    const { totalApp, totalPages, application } = await getAllApplicationService(pageNum);
    res.status(StatusCodes.OK).json({ totalApp, totalPages, application });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}

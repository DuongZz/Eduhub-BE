import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { getAllUserService } from '../../services/admin/getAllUserService';

export const getAllUserController = async (req: Request, res: Response) => {
  try {
    const { page } = req.query;
    const pageNum = page ? Number(page) : 1;
    const { totalUser, totalPages, user } = await getAllUserService(pageNum);
    res.status(StatusCodes.OK).json({ totalUser, totalPages, user });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}

import { getApplicationByOptionService } from './../../services/admin/getApplicationByOptionService';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

export const getApplicationByOptionController = async (req: Request, res: Response) => {
  try {
    const { page } = req.query;
    const pageNum = page ? Number(page) : 1;
    const { status } = req.query;

    const userOrder = await getApplicationByOptionService(status as string, pageNum);
    res.status(StatusCodes.OK).json(userOrder);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
} 

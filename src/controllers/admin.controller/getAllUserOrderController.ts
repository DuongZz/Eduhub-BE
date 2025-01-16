import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { getAllUserOrderService } from '../../services/admin/getAllUserOrderService';

export const getAllUserOrderController = async (req: Request, res: Response) => {
  try {
    const { page } = req.query;
    const pageNum = page ? Number(page) : 1;

    const userOrder = await getAllUserOrderService(pageNum);
    res.status(StatusCodes.OK).json(userOrder);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
} 

import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { getUserOrderService } from '../../services/admin/getUserOrderService';

export const getUserOrderController = async (req: Request, res: Response) => {
  try {
    const { orderStatus, page } = req.query;
    const pageNum = page ? Number(page) : 1;

    const userOrder = await getUserOrderService(orderStatus as string, pageNum);
    res.status(StatusCodes.OK).json(userOrder);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
} 

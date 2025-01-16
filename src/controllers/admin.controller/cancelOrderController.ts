import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { cancelOrderService } from '../../services/admin/cancelOrderService';

export const cancelOrderController = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const order = await cancelOrderService(orderId);
    res.status(StatusCodes.OK).json(order);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}

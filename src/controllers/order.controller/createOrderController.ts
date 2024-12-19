import { Request, Response } from 'express';
import { createOrderService } from '../../services/order/createOrderService';
import { StatusCodes } from 'http-status-codes';

export const createOrderController = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { courseIds } = req.body;

    if (!courseIds || !Array.isArray(courseIds)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Invalid course IDs.',
      });
    }

    const newOrder = await createOrderService(userId, courseIds);

    res.status(StatusCodes.CREATED).json({
      message: 'Order created successfully.',
      data: newOrder,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Error creating order.',
      error: error.message,
    });
  }
};

import { getMyOrderService } from "../../services/order/getMyOrderService";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const getMyOrderController = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const myOrder = await getMyOrderService(userId);
    res.status(StatusCodes.OK).json(myOrder)
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}

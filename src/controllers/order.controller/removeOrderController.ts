import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { removeOrderService } from "../../services/order/removeOrderService";

export const removeOrderController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await removeOrderService(id);
    res.status(StatusCodes.OK).json({ message: 'Remove order successfully', order });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}

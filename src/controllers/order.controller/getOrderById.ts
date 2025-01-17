import { getMyOrderService } from "../../services/order/getMyOrderService";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Order from "../../models/order";

export const getOrderById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const order = await Order.findById({ _id: id }).sort({ createdAt: -1 });
        res.status(StatusCodes.OK).json(order)
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
}
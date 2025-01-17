import { ObjectId } from "mongoose";
import Order from "../../models/order";

export const getMyOrderService = async (userId: ObjectId) => {
  try {
    const order = await Order.find({ user: userId }).sort({ createdAt: -1 });
    if (!order) {
      throw new Error('No order found')
    }
    return order
  } catch (err) {
    throw new Error(err);
  }
}

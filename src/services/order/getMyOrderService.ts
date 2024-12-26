import Order from "../../models/order";

export const getMyOrderService = async (userId: string) => {
  try {
    const order = await Order.find({ user: userId });
    if (!order) {
      throw new Error('No order found')
    }
    return order
  } catch (err) {
    throw new Error(err);
  }
}

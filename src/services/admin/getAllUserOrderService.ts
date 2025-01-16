import Order from "../../models/order"

export const getAllUserOrderService = async (page: number) => {
  try {
    const limit = 8;
    const skip = (page - 1) * limit;
    const allOrder = await Order.find({})
      .populate({
        path: 'user',
        select: 'fullName role phone'
      })
      .skip(skip)
      .limit(limit);
    const allOrders = allOrder.filter(order => order.user !== null);
    if (allOrders.length === 0) {
      return { message: 'Không có order' };
    }
    return allOrders;
  } catch (err) {
    throw new Error(err);
  }
}

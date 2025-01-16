import Order from "../../models/order"

export const getAllUserOrderService = async (page: number) => {
  try {
    const limit = 8;
    const skip = (page - 1) * limit;
    const allOrder = await Order.find({})
      .populate({
        path: 'user',
        select: 'fullName role phone email'
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const allOrders = allOrder.filter(order => order.user !== null);
    const totalOrder = await Order.countDocuments({});
    const totalPages = Math.ceil(totalOrder / limit);
    if (allOrders.length === 0) {
      return { message: 'Không có order' };
    }
    return { allOrders, totalOrder, totalPages };
  } catch (err) {
    throw new Error(err);
  }
}

import Order from "../../models/order";
import User from "../../models/user";

export const getUserOrderService = async (orderStatus: string, page: number) => {
  try {
    const limit = 8;
    const skip = (page - 1) * limit;

    const userOrder = await Order.find({ paymentStatus: orderStatus })
      .populate({
        path: 'user',
        select: 'fullName role phone',
      })
      .skip(skip)
      .limit(limit);

    // Lọc kết quả để loại bỏ các đơn hàng không có user hợp lệ
    const filteredOrders = userOrder.filter(order => order.user !== null);

    if (filteredOrders.length === 0) {
      return { message: 'Không có order' };
    }

    return filteredOrders;
  } catch (err) {
    throw new Error(err);
  }
}

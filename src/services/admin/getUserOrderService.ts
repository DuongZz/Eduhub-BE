import Order from "../../models/order";
import User from "../../models/user";

export const getUserOrderService = async (role: string, page: number) => {
  try {
    const limit = 8;
    const skip = (page - 1) * limit;

    const usersWithRole = await User.find({ role }).select('_id');
    if (usersWithRole.length === 0) {
      return { message: 'Không tìm thấy người dùng với role này' };
    }

    const userOrder = await Order.find({ user: { $in: usersWithRole.map(user => user._id) } })
      .populate({
        path: 'user',
        match: { role },
        select: 'fullName role',
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

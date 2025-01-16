import Order from "../../models/order";
import { PAYMENT_STATUS } from "../../models/type";

export const cancelOrderService = async (orderId: string) => {
  try {
    const order = await Order.findById(orderId);
    if (order.paymentStatus === 'Paid') {
      return { message: 'Đơn hàng đã thanh toán' }
    } else if (order.paymentStatus === 'Fail') {
      return { message: 'Đơn hàng đã bị hủy trước đó' }
    }
    order.paymentStatus = PAYMENT_STATUS.FAIL;
    await order.save();
    return { message: 'Hủy đơn hàng thành công', order };
  } catch (err) {
    throw new Error(err);
  }
}

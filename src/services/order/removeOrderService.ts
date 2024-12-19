import Order from "../../models/order";

export const removeOrderService = async (orderId: string) => {
  try {
    const order = await Order.findByIdAndDelete({ _id: orderId })
    console.log("🚀 ~ removeOrderService ~ order:", order)
    if (!order) {
      throw new Error('Order not exist')
    }
    return order;
  } catch (err) {
    throw new Error(err);
  }
}

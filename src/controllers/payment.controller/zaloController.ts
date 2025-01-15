import axios from "axios";
import moment from "moment";
import CryptoJS from "crypto-js";
import { StatusCodes } from "http-status-codes";
import Order from "../../models/order";
import config from "../../config/config";
import { ZaloCallbackResponse, ZaloOrder } from "../../interfaces/zalopayInterface";
import order from "../../models/order";
// Tạo thanh toán với ZaloPay
export const createPaymentWithZalo = async (req, res, next) => {
  try {
    const { id } = req.body;
    const preOrder = await Order.findById(id);

    if (!preOrder) {
      throw new Error("Order not found");
    }

    const embed_data = {
      redirecturl: `${config.eduhub_host}/payment-success?id=${preOrder._id}`,
    };

    // Định dạng items đúng chuẩn ZaloPay
    const items = preOrder.items.map(item => ({
      itemid: item.course.toString(),
      itemname: item.courseName,
      itemprice: item.price,
      itemquantity: 1
    }));
    const transID = preOrder._id.toString();


    // Khởi tạo order với kiểu dữ liệu ZaloOrder
    const order: ZaloOrder = {
      app_id: config.zalo.zalo_api_id,
      app_trans_id: `${moment().format("YYMMDD")}_${transID}_${Math.random().toString(36).substring(2, 7)}`,
      app_user: preOrder.user,
      app_time: Date.now(),
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount: preOrder.totalAmount,
      callback_url: config.zalo.zalo_callback,
      description: `Payment for order #${transID}`,
      bank_code: "",
      mac: "" // Khởi tạo mac là chuỗi rỗng
    };

    // Tính toán chữ ký MAC
    const data = `${order.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`;
    order.mac = CryptoJS.HmacSHA256(data, config.zalo.zalo_key1).toString();

    // Gửi request đến ZaloPay
    const result = await axios.post(config.zalo.zalo_endpoint, null, { params: order });

    res.status(StatusCodes.OK).json(result.data);
  } catch (error) {
    next(error);
  }
};

export const zaloCallback = async (req, res) => {
  let result: ZaloCallbackResponse = {
    return_code: 0,
    return_message: "",
  };

  try {
    const dataStr = req.body.data;
    const reqMac = req.body.mac;

    const mac = CryptoJS.HmacSHA256(dataStr, config.zalo.zalo_key2).toString();

    // Kiểm tra tính hợp lệ của callback từ ZaloPay
    if (reqMac !== mac) {
      result.return_code = -1;
      result.return_message = "Chữ ký không hợp lệ";
    } else {
      const dataJson = JSON.parse(dataStr);
      const id = dataJson["app_trans_id"].split("_")[1];
      console.log("orderId", id);

      // Cập nhật trạng thái đơn hàng
      await order.findByIdAndUpdate(id, {
        paymentStatus: "Paid",
        updateAt: Date.now()
      })

      console.log(`Đơn hàng ${id} đã được thanh toán thành công`);

      result.return_code = 1;
      result.return_message = "Thành công";
    }
  } catch (error) {
    console.log("Lỗi xử lý callback:", error.message);
    result.return_code = 0;
    result.return_message = error.message;
  }

  // Trả kết quả cho ZaloPay
  res.json(result);
};

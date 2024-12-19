import crypto from "crypto";
import axios from "axios";
import { StatusCodes } from "http-status-codes";
import Order from "../../models/order";
import User from "../../models/user";
import config from "../../config/config";
import { PAYMENT_STATUS } from "../../models/type";
import mongoose from "mongoose";


export const initiatePaymentMomo = async (req, res, next) => {
  const id = req.body.id;
  const preOrder = await Order.findById(id);
  if (!preOrder) {
    res.status(StatusCodes.NOT_FOUND).json('Order not found')
  }

  const transactorName = preOrder.user;
  const totalAmount = preOrder.totalAmount;
  const orderId = preOrder._id;
  const requestId = orderId;

  config.momo.amount = totalAmount;

  const {
    accessKey,
    secretKey,
    orderInfo,
    partnerCode,
    redirectUrl,
    ipnUrl,
    requestType,
    amount,
    autoCapture,
    extraData,
    lang,
  } = config.momo;

  const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  console.log("--------------------RAW SIGNATURE----------------");
  console.log(rawSignature);
  console.log("--------------------SIGNATURE----------------");
  console.log(signature);

  const requestBody = JSON.stringify({
    partnerCode,
    partnerName: transactorName,
    storeId: "MomoTestStore",
    requestId,
    amount: totalAmount,
    orderId: orderId,
    orderInfo,
    redirectUrl,
    ipnUrl,
    lang,
    requestType,
    autoCapture,
    extraData,
    signature,
  });

  const options = {
    method: "POST",
    url: config.momo.endpoints,
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(requestBody),
    },
    data: requestBody,
  };

  try {
    const result = await axios(options);
    return res.status(200).json(result.data);
  } catch (error) {
    console.error(
      "MoMo API Error:",
      error.response ? error.response.data : error.message
    );
    return res
      .status(500)
      .json({ error: error.response ? error.response.data : error.message });
  }
};

export const handleMomoIPN = async (req, res) => {
  try {
    const {
      partnerCode,
      orderId,
      requestId,
      amount,
      orderInfo,
      orderType,
      transId,
      resultCode,
      message,
      payType,
      responseTime,
      extraData,
      signature,
    } = req.body;

    const rawSignature = `accessKey=${config.momo.accessKey}&amount=${amount}&extraData=${extraData}&message=${message}&orderId=${orderId}&orderInfo=${orderInfo}&orderType=${orderType}&partnerCode=${partnerCode}&payType=${payType}&requestId=${requestId}&responseTime=${responseTime}&resultCode=${resultCode}&transId=${transId}`;
    const computedSignature = crypto
      .createHmac("sha256", config.momo.secretKey)
      .update(rawSignature)
      .digest("hex");

    if (signature !== computedSignature) {
      console.error("Chữ ký không hợp lệ");
      return res.status(400).json({ error: "Chữ ký không hợp lệ" });
    }

    if (resultCode === 0) {
      // Xử lý khi thanh toán thành công
      const order = await Order.findById(orderId).populate("user");
      if (!order) {
        console.error(`Không tìm thấy đơn hàng ${orderId}`);
        return res.status(404).json({ error: "Order not found" });
      }

      await Order.findByIdAndUpdate(orderId, {
        paymentStatus: PAYMENT_STATUS.PAID,
        updatedAt: new Date(),
      });

      const user = await User.findById(order.user);
      if (!user) {
        console.error(`Không tìm thấy user ${order.user}`);
        return res.status(404).json({ error: "User not found" });
      }

      order.items.forEach((item) => {
        const courseId = item.course;
        if (!user.coursePurchased.includes(courseId)) {
          user.coursePurchased.push(courseId);
        }
      });

      await user.save();

      console.log(`Đơn hàng ${orderId} đã được thanh toán thành công`);
    } else {
      console.log(
        `Thanh toán đơn hàng ${orderId} thất bại với mã lỗi: ${resultCode}`
      );
    }

    return res.status(200).json({ message: "IPN nhận thành công" });
  } catch (error) {
    console.error("Lỗi xử lý IPN:", error);
    return res.status(500).json({ error: error.message });
  }
};

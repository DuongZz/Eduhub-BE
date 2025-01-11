import { Request, Response } from "express";
import User from "../models/user";
import { transporter } from "../config/configEmail";
import { StatusCodes } from "http-status-codes";
import config from "../config/config";

export const sendOTPController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Email không tồn tại" });
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetPasswordOTP = otpCode;
    user.resetPasswordOTPExpire = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();

    await transporter.sendMail({
      from: config.email.sender_email,
      to: email,
      subject: "Mã xác thực quên mật khẩu",
      text: `Mã xác thực của bạn là: ${otpCode}. Mã có hiệu lực trong 5 phút.`,
    });

    res.status(StatusCodes.OK).json({ message: "Đã gửi mã OTP vào email" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Lỗi gửi OTP", error: error.message });
  }
};

export const verifyOTPController = async (req: Request, res: Response) => {
  try {
    const { email, otpCode } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.resetPasswordOTP !== otpCode) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Mã OTP không đúng" });
    }

    if (user.resetPasswordOTPExpire! < new Date()) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Mã OTP đã hết hạn" });
    }

    res.status(StatusCodes.OK).json({ message: "Xác thực OTP thành công" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Lỗi xác thực OTP", error: error.message });
  }
};

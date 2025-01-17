import { Response, Request } from "express";
import User from "../../models/user";
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes'

export const resetPasswordController = async (req: Request, res: Response) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;
    const user = await User.findOne({ email });

    if (newPassword !== confirmPassword) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "Mật khẩu không khớp."
      });
    };
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    user.resetPasswordOTP = undefined;
    user.resetPasswordOTPExpire = undefined;

    await user.save();

    res.status(StatusCodes.OK).json({ message: "Đặt lại mật khẩu thành công" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Lỗi đặt lại mật khẩu", error: error.message });
  }
};

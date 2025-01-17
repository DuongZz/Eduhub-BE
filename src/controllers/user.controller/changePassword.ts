import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../../models/user";
import bcrypt from "bcrypt";

export const changePasswordController = async (req: Request, res: Response) => {
  try {
    const { oldPassword, newPassword, passwordConfirm } = req.body;
    const { id } = req.user;

    if (!oldPassword || !newPassword || !passwordConfirm) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Vui lòng nhập đầy đủ thông tin."
      });
    }

    if (newPassword !== passwordConfirm) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Mật khẩu mới và mật khẩu xác nhận không khớp."
      });
    }

    const user = await User.findById(id);

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Mật khẩu cũ không chính xác."
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    return res.status(StatusCodes.OK).json({
      message: "Đổi mật khẩu thành công."
    });
  } catch (err) {
    console.error("Error changing password:", err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Lỗi máy chủ. Vui lòng thử lại sau."
    });
  }
};

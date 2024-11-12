import { Request, Response } from "express";
import User from "../../models/user";
import { StatusCodes } from 'http-status-codes';

export const logOut = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      const userId = req.user._id;

      await User.updateOne({ _id: userId }, {
        $set: {
          refreshToken: undefined,
        },
      });
    }

    // Xóa cookie
    res.clearCookie("refreshToken", {
      path: "/",
      sameSite: false,
      secure: true,
      httpOnly: true,
    });

    res.clearCookie("accessToken", {
      path: "/",
      sameSite: true,
      secure: true,
      httpOnly: true,
    });

    res.status(StatusCodes.OK).json({ message: "Logout successful" });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
}

import { Request, Response } from "express";
import User from "../../models/user";
import { StatusCodes } from 'http-status-codes';

export const logOut = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      const userId = req.user.id;

      await User.updateOne({ _id: userId }, {
        $set: {
          refreshToken: undefined,
        },
      });
    }

    const isProd = process.env.NODE_ENV === 'production';
    const cookieOptions = {
      path: "/",
      secure: isProd,
      httpOnly: true,
      sameSite: (isProd ? 'none' : 'lax') as 'none' | 'lax',
    };

    // Xóa cookie
    res.clearCookie("refreshToken", cookieOptions);
    res.clearCookie("accessToken", cookieOptions);

    res.status(StatusCodes.OK).json({ message: "Logout successful" });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
}

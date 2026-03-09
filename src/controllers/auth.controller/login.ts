import { Response, Request } from "express";
import User from "../../models/user";
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes'
import { generateAccessToken, generateRefreshToken } from "../../utils/generateToken";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Email not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Wrong password' });
    }

    if (user && validPassword) {
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      const isProd = process.env.NODE_ENV === 'production';
      const accessMaxAgeMs = 15 * 24 * 60 * 60 * 1000; // 15 days
      const refreshMaxAgeMs = 360 * 24 * 60 * 60 * 1000; // 360 days
      const cookieOptions = {
        path: "/",
        secure: isProd,
        httpOnly: true,
        sameSite: (isProd ? 'none' : 'lax') as 'none' | 'lax',
      };

      await User.updateOne({ _id: user._id }, {
        $set: {
          refreshToken: refreshToken,
        },
      }, {})

      res.cookie("refreshToken", refreshToken, { ...cookieOptions, maxAge: refreshMaxAgeMs });
      res.cookie("accessToken", accessToken, { ...cookieOptions, maxAge: accessMaxAgeMs });

      return res.status(StatusCodes.OK).json({ message: "Login successful" });
    }
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}

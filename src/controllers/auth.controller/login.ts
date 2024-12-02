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

      await User.updateOne({ _id: user._id }, {
        $set: {
          refreshToken: refreshToken,
        },
      }, {})

      res.cookie("refreshToken", refreshToken, {
        path: "/",
        secure: false,
        httpOnly: true,
      });

      res.cookie("accessToken", accessToken, {
        path: "/",
        secure: false,
        httpOnly: true,
      });

      return res.status(StatusCodes.OK).json({
        message: "Login successful",
      });
    }
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}

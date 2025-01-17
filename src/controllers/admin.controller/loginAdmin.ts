import { Response, Request } from "express";
import User from "../../models/user";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { generateAccessToken, generateRefreshToken } from "../../utils/generateToken";

export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Email not found" });
    }

    if (user.role !== "ADMIN") {
      return res.status(StatusCodes.FORBIDDEN).json({ message: "Access denied. Not an admin." });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Wrong password" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

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

    return res.status(StatusCodes.OK).json({ message: "Admin login successful", adminInfo: user });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

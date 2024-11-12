import { Response, Request } from "express";
import User from "../../models/user";
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes'

export const forgotPass = async (req: Request, res: Response) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'Email not found' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(StatusCodes.OK).json({ message: 'Reset password successfully' })
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}

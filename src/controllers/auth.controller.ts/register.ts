import { StatusCodes } from 'http-status-codes';
import { Response, Request } from "express";
import User from "../../models/user";
import bcrypt from 'bcrypt';

export const register = async (req: Request, res: Response) => {
  try {
    const { fullName, email, phone, password } = req.body;
    const user = await User.findOne({ email });

    if (!password) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Password is required.' });
    }

    if (user) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Email existing.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      phone,
      password: hashedPassword,
    })
    await newUser.save();

    res.status(StatusCodes.OK).json({ message: 'Registered successfully' });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}

import { NextFunction, Response, Request } from "express";
import User from "../../models/user";
import bcrypt from 'bcrypt';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, gender, dateOfBirth, residence, avatar } = req.body;
    console.log("🚀 ~ register ~ req.body:", req.body)
    const user = await User.findOne({ email });
    if (!password) {
      return res.status(400).json({ message: 'Password is required.' });
    }
    if (user) {
      return res.status(400).json({ message: 'Email existing.' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      gender,
      dateOfBirth,
      residence,
      avatar,
    })
    await newUser.save();
    res.status(201).json({
      message: 'Registation successfully',
      user: {
        uuid: newUser.uuid, email: newUser.email,
        firstName: newUser.firstName, lastName: newUser.lastName
      }
    });
  } catch (error) {
    throw (error);
  }
}

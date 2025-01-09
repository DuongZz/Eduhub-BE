import { editProfileService } from './../../services/user/editProfileService';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

export const editProfileController = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const userProfile = req.body;
    const updatedProfile = await editProfileService(userId, userProfile);
    res.status(StatusCodes.OK).json({ message: 'Cập nhật thông tin thành công!', data: updatedProfile })
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}

import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { editProfileService } from '../../services/user/editProfileService';

export const editProfileController = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const userProfile = req.body;
    const avatarFile = req.file;

    const updatedProfile = await editProfileService(userId, userProfile, avatarFile);

    res.status(StatusCodes.OK).json({
      message: 'Cập nhật thông tin và avatar thành công!',
      data: updatedProfile
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Cập nhật thất bại!',
      error: err.message
    });
  }
};

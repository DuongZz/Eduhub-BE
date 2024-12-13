import { editProfileService } from './../../services/user/editProfileService';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

export const editProfileController = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    console.log("🚀 ~ editProfileController ~ userId:", userId)
    const userProfile = req.body;
    console.log("🚀 ~ editProfileController ~ userProfile:", userProfile)
    const updatedProfile = await editProfileService(userId, userProfile);
    res.status(StatusCodes.OK).json({ message: 'Update Successfully', data: updatedProfile })
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}

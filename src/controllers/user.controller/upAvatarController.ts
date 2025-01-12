import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { upAvatarService } from '../../services/user/upAvatarService';

export const upAvatarController = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const avatar = req.file;
    if (!req.file) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Avatar file is required',
      })
    }
    const avatarUpdated = await upAvatarService(userId, avatar);

    res.status(StatusCodes.OK).json({ message: 'Cập nhật avatar thành công', data: avatarUpdated });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}

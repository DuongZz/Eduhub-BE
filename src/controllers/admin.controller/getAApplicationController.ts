import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { getAApplicationService } from '../../services/admin/getAApplicationService';

export const getAApplicationController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const application = await getAApplicationService(id);
    return res.status(StatusCodes.OK).json(application);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}

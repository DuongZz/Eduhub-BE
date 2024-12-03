// controllers/application/applyInstructorController.ts
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { applyInstructorService } from '../../services/user/applyInstructorService';

export const applyInstructorController = async (req: Request, res: Response) => {
  try {
    const { description, cv, title, linkFb, experience, topic } = req.body;

    const userId = req.user.id;

    const applicationData = { description, cv, title, linkFb, experience, topic };

    const application = await applyInstructorService(userId, applicationData);

    res.status(StatusCodes.CREATED).json({
      message: 'Application submitted successfully.',
      data: application,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message || 'Error submitting application.',
    });
  }
};

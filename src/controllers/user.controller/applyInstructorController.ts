import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { applyInstructorService } from '../../services/user/applyInstructorService';
import path from 'path';

export const applyInstructorController = async (req: Request, res: Response) => {
  try {
    const { title, linkFb, experience, topic } = req.body;

    if (!req.file) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'CV file is required.',
      });
    }

    const cvUrl = path.join('/uploads/cvs', req.file.filename);

    const userId = req.user.id;

    const applicationData = {
      cv: cvUrl,
      title,
      linkFb,
      experience,
      topic,
    };

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

// controllers/application/applyInstructorController.ts
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { applyInstructorService } from '../../services/user/applyInstructorService';
import { uploadFileToS3 } from '../../middlewares/uploadCVMiddleware';

export const applyInstructorController = async (req: Request, res: Response) => {
  try {
    const { description, title, linkFb, experience, topic } = req.body;

    const cvUrl = req.file ? await uploadFileToS3(req.file) : null;

    if (!cvUrl) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'CV file is required.',
      });
    }

    const userId = req.user.id;

    const applicationData = {
      description,
      cv: cvUrl,
      title,
      linkFb,
      experience,
      topic
    };

    const application = await applyInstructorService(userId, applicationData);

    // Trả về kết quả
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

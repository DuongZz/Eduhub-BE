import { Request, Response } from 'express';
import { uploadLessonService } from '../../services/lesson/uploadLessonService';
import { StatusCodes } from 'http-status-codes';

export const uploadLessonController = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'No video file uploaded' });
  }

  try {
    const videoUrl = await uploadLessonService(req.file);
    return res.status(StatusCodes.OK).json({
      message: 'Video uploaded successfully',
      videoUrl,
    });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Error uploading video to S3',
      error: error.message,
    });
  }
};

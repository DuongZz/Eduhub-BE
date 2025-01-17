import { uploadLinkYoutubeService } from './../../services/lesson/uploadLinkYoutubeService';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const uploadLinkYoutubeController = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const { lessonName, lessonContent } = req.body;

    const video = await uploadLinkYoutubeService(courseId, lessonName, lessonContent);
    return res.status(StatusCodes.OK).json({
      message: 'Video uploaded successfully',
      video,
    });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Error uploading video',
      error: error.message,
    });
  }
};

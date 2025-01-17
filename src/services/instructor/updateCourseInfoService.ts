import config from '../../config/config';
import Course from '../../models/course';
import { s3 } from '../../config/s3bucket'

export const updateCourseInfoService = async (courseId: string, updates: any, file: Express.Multer.File) => {
  let posterUrl;

  if (file && file.buffer) {
    const params = {
      Bucket: config.s3.bucket,
      Key: `poster/${Date.now()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };
    const data = await s3.upload(params).promise();
    posterUrl = data.Location;
  }
  try {
    const updatedData = file ? { ...updates, poster: posterUrl } : updates;

    const updatedCourse = await Course.findByIdAndUpdate(courseId, updatedData, { new: true });

    if (!updatedCourse) {
      throw new Error('Course not found');
    }
    return { updatedCourse };
  } catch (error) {
    throw new Error(`Failed to update course: ${error.message}`);
  }
};

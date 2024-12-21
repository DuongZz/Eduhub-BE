import config from '../../config/config';
import Course from '../../models/course';
import { s3 } from '../../config/s3bucket'

export const updateCourseInfoService = async (courseId: string, updates: any, file: Express.Multer.File) => {
  if (!file || !file.buffer) {
    throw new Error('File or file buffer is missing')
  }
  const params = {
    Bucket: config.s3.bucket,
    Key: `poster/${Date.now()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read',
  };
  const data = await s3.upload(params).promise();
  const posterUrl = data.Location;
  try {
    const updatedData = { ...updates, poster: posterUrl };

    const updatedCourse = await Course.findByIdAndUpdate(courseId, updatedData, { new: true });

    if (!updatedCourse) {
      throw new Error('Course not found');
    }
    return { updatedCourse };
  } catch (error) {
    throw new Error(`Failed to update course: ${error.message}`);
  }
};

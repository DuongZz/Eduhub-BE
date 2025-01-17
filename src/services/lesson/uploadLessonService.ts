import config from '../../config/config';
import { s3 } from '../../config/s3bucket'
import Course from '../../models/course';
import Lesson from '../../models/lesson';
import { generateSlug } from '../../utils/generateSlug';

export const uploadLessonService = async (file: Express.Multer.File, courseId: string,
  lessonName: string, lessonContent: string): Promise<string> => {
  if (!file || !file.buffer) {
    throw new Error('File or file buffer is missing');
  }
  const params = {
    Bucket: config.s3.bucket,
    Key: `videos/${Date.now()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read',
  };

  try {
    const data = await s3.upload(params).promise();
    const videoUrl = data.Location;

    const newLesson = new Lesson({
      courseId,
      lessonName,
      lessonContent: videoUrl,
      slug: generateSlug(lessonName)
    })

    const lesson = await newLesson.save()
    const course = await Course.findById(courseId);
    if (!courseId) {
      throw new Error('Course not found');
    }
    course.videos.push(lesson._id)
    await course.save()
    return videoUrl;
  } catch (err) {
    throw new Error('Error uploading video to S3: ' + err.message);
  }
};

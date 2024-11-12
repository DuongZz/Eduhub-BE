import config from '../../config/config';
import { s3 } from '../../config/s3bucket';

export const uploadLessonService = async (file: Express.Multer.File): Promise<string> => {
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
    return data.Location;
  } catch (err) {
    throw new Error('Error uploading video to S3: ' + err.message);
  }
};

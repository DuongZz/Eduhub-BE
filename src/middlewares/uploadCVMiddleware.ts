import multer from 'multer';
import { s3 } from '../config/s3bucket';
import config from '../config/config';

const cvStorage = multer.memoryStorage();
const cvUpload = multer({
  storage: cvStorage,
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and Word files are allowed.'));
    }
  },
});

export const cvUploadMiddleware = cvUpload.single('cv');

export const uploadFileToS3 = async (file: Express.Multer.File): Promise<string> => {
  const params = {
    Bucket: config.s3.bucket,
    Key: `cv/${Date.now()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read',
  };

  try {
    const data = await s3.upload(params).promise();
    return data.Location;
  } catch (err) {
    throw new Error('Error uploading file to S3: ' + err.message);
  }
};

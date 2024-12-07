import multer from 'multer';

const videoStorage = multer.memoryStorage();
const videoUpload = multer({
  storage: videoStorage,
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['video/mp4'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only MP4 videos are allowed.'));
    }
  },
});

export const videoUploadMiddleware = videoUpload.single('video');





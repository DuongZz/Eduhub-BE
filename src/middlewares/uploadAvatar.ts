import multer from 'multer';

const avatarStorage = multer.memoryStorage();
const avatarUpload = multer({
  storage: avatarStorage,
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG images are allowed.'));
    }
  },
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

export const avatarUploadMiddleware = avatarUpload.single('avatar');




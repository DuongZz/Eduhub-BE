import multer from 'multer';
import path from 'path';
import fs from 'fs';

const cvFolderPath = path.join(__dirname, '../../uploads/cvs');
if (!fs.existsSync(cvFolderPath)) {
  fs.mkdirSync(cvFolderPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, cvFolderPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

export const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Chỉ cho phép các tệp có định dạng .pdf, .doc, .docx
    const allowedExtensions = /pdf|doc|docx/;
    const isValid = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
    if (isValid) {
      cb(null, true);
    } else {
      cb(new Error('Only .pdf, .doc, and .docx formats are allowed!'));
    }
  },
});

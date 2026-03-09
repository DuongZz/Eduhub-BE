import { IUser } from "../interfaces/index";
import { File } from 'multer';

declare global {
  namespace Express {
    export interface Request {
      user?: IUser;
      file?: File;
      files?: File[];
    }
  }
}

import { IUser } from "../interfaces/index";

declare global {
  namespace Express {
    export interface Request {
      user?: IUser;
    }
  }
}

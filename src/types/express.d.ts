import { IUser } from "../models/interfaces";

declare global {
  namespace Express {
    export interface Request {
      user?: IUser;
    }
  }
}

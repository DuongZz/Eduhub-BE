import { RATING, LEVEL } from "../models/type";
import { IUser } from "./userInterface";
export interface ICourse {
  courseId: string
  courseName: string
  description: string
  rating: RATING
  level: LEVEL
  price: number
  dateCreated: Date
  approvedBy: IUser
}

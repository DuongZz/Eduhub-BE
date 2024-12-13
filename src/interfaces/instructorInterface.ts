import { Document, Types } from 'mongoose';

export interface IInstructor extends Document {
  user: Types.ObjectId;
  description: string;
  cv: string;
  title: string;
  linkFb?: string;
  experience?: string;
  topic?: string;
  students?: number;
  rating?: number;
  courseAmount?: number;
}

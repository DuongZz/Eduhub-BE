import { Schema } from "mongoose";

export interface ILesson {
  id: Schema.Types.ObjectId;
  lessonName: string
  lessonContent: string
}

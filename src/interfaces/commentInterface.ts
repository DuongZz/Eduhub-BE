import { Schema } from "mongoose";
export interface IComment {
  id: Schema.Types.ObjectId;
  commentContent: string
  userId: Schema.Types.ObjectId;
  discussionId: Schema.Types.ObjectId;
  replyComment: Schema.Types.ObjectId[];
  commentedDate: Date
  number_of_like: number
  number_of_dislike: number
}

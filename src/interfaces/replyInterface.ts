import { Schema } from "mongoose";

export interface IReply {
  id: Schema.Types.ObjectId;
  commentId: Schema.Types.ObjectId;
  replyContent: string
  userId: Schema.Types.ObjectId;
  reply_date?: Date
  number_of_like?: number
  number_of_dislike?: number
}

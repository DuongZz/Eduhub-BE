import { Schema } from "mongoose";

export interface IDiscussion {
  id: Schema.Types.ObjectId;
  discussionTopic: string
  discussionContent: Schema.Types.ObjectId[]
}

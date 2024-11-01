import { IComment } from "./commentInterface"
export interface IDiscussion {
  discussionId: string
  discussionTopic: string
  discussionContent: IComment[]
}

import { IReply } from "./replyInterface"

export interface IComment {
  commentId: string
  commentContent: string
  userId: string
  discussionId: string
  replyComment: IReply[]
  commentedDate: Date
  number_of_like: number
  number_of_dislike: number
}

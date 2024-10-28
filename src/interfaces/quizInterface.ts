import { IAnswer } from './answerInterface'
export interface IQuiz {
  quizId: string
  question: string
  response: string
  answer: IAnswer[]
  maxScore: number
  durationTime: number
}


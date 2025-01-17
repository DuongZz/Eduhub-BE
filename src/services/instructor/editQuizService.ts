import mongoose from 'mongoose';
import Quiz from '../../models/quiz';
import Question from '../../models/question';
import Answer from '../../models/answer';

export const editQuizService = async (quizId: string, data: any) => {
  const session = await mongoose.startSession();  // Bắt đầu session
  session.startTransaction();  // Bắt đầu transaction

  try {
    const { quizName, courseId, durationTime, maxScore, questions } = data;

    if (!quizName || !courseId || !durationTime || !maxScore || !Array.isArray(questions)) {
      throw new Error('Invalid input data');
    }

    // Cập nhật quiz
    const quiz = await Quiz.findById(quizId).session(session);
    if (!quiz) {
      throw new Error('Quiz not found');
    }

    quiz.quizName = quizName;
    quiz.courseId = courseId;
    quiz.durationTime = durationTime;
    quiz.maxScore = maxScore;

    // Cập nhật câu hỏi
    const questionIds = [];
    for (const questionData of questions) {
      const { questionId, text, maxScore: questionMaxScore, answers } = questionData;

      // Nếu câu hỏi đã tồn tại, chúng ta tìm và cập nhật nó
      let question;
      if (questionId) {
        question = await Question.findById(questionId).session(session);
        if (!question) {
          throw new Error(`Question with ID ${questionId} not found`);
        }

        question.text = text;
        question.maxScore = questionMaxScore;
      } else {
        // Nếu câu hỏi mới, tạo câu hỏi mới
        question = new Question({
          text,
          maxScore: questionMaxScore,
        });
      }

      // Cập nhật các câu trả lời
      const answerIds = [];
      for (const answerData of answers) {
        let answer;
        if (answerData.answerId) {
          answer = await Answer.findById(answerData.answerId).session(session);
          if (!answer) {
            throw new Error(`Answer with ID ${answerData.answerId} not found`);
          }

          answer.text = answerData.text;
          answer.isCorrect = answerData.isCorrect;
        } else {
          answer = new Answer({
            text: answerData.text,
            isCorrect: answerData.isCorrect,
          });
        }

        await answer.save();
        answerIds.push(answer._id);
      }

      // Cập nhật câu trả lời trong câu hỏi
      question.answers = answerIds;

      await question.save();
      questionIds.push(question._id);
    }

    // Cập nhật danh sách câu hỏi trong quiz
    quiz.questions = questionIds;
    await quiz.save();

    await session.commitTransaction();  // Commit nếu tất cả thành công
    session.endSession();

    return quiz;  // Trả về quiz đã cập nhật
  } catch (error) {
    await session.abortTransaction();  // Rollback nếu có lỗi
    session.endSession();
    throw new Error(error.message || 'Failed to update quiz');
  }
};

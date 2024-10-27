import {Quiz} from '../models/quiz.model';

export class QuizService {
  async createQuiz(title: string) {
    return await Quiz.create({ title });
  }

  async getAllQuizzes() {
    return await Quiz.findAll();
  }

  async getQuizById(id: number) {
    return await Quiz.findByPk(id);
  }

  async updateQuiz(id: number, title: string) {
    const quiz = await this.getQuizById(id);
    if (quiz) {
      quiz.title = title;
      await quiz.save();
      return quiz;
    }
    throw new Error('Quiz not found');
  }

  async deleteQuiz(id: number) {
    const quiz = await this.getQuizById(id);
    if (quiz) {
      await quiz.destroy();
      return true;
    }
    throw new Error('Quiz not found');
  }
}
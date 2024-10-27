import { Request, Response } from 'express';
import { QuizQuestionsService } from '../services/quizQuestions.service';

const quizQuestionsService = new QuizQuestionsService();

export class QuizQuestionsController {
  // Ajouter une question à un quiz
  async addQuestionToQuiz(req: Request, res: Response): Promise<void> {
    const { quizId, questionId } = req.body;
    try {
      const quizQuestion = await quizQuestionsService.addQuestionToQuiz(quizId, questionId);
      res.status(201).json(quizQuestion);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            throw new Error(error.message);
        } else {
            console.error('Unknown error');
            throw new Error('Unknown error');
        }
    }
  }

  // Récupérer les questions associées à un quiz
  async getQuestionsByQuiz(req: Request, res: Response): Promise<void> {
    const { quizId } = req.params;
    try {
      const questions = await quizQuestionsService.getQuestionsByQuiz(Number(quizId));
      res.status(200).json(questions);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            throw new Error(error.message);
        } else {
            console.error('Unknown error');
            throw new Error('Unknown error');
        }
    }
  }

  // Retirer une question d'un quiz
  async removeQuestionFromQuiz(req: Request, res: Response): Promise<void> {
    const { quizId, questionId } = req.body;
    try {
      const result = await quizQuestionsService.removeQuestionFromQuiz(quizId, questionId);
      res.status(200).json(result);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            throw new Error(error.message);
        } else {
            console.error('Unknown error');
            throw new Error('Unknown error');
        }
    }
  }
}

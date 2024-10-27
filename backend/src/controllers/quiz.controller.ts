import { Request, Response } from 'express';
import { QuizService } from '../services/quiz.service';

const quizService = new QuizService();

export class QuizController {
  async createQuiz(req: Request, res: Response) {
    try {
      const { title } = req.body;
      const quiz = await quizService.createQuiz(title);
      res.status(201).json(quiz);
    } catch (error) {
      res.status(500).json({ error: 'une erreur est survenue' });
    }
  }

  async getAllQuizzes(req: Request, res: Response) {
    try {
      const quizzes = await quizService.getAllQuizzes();
      res.status(200).json(quizzes);
    } catch (error) {
      res.status(500).json({ error: 'une erreur est survenue' });
    }
  }

  async getQuizById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const quiz = await quizService.getQuizById(Number(id));
      if (quiz) {
        res.status(200).json(quiz);
      } else {
        res.status(404).json({ error: 'Quiz not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'une erreur est survenue' });
    }
  }

  async updateQuiz(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title } = req.body;
      const updatedQuiz = await quizService.updateQuiz(Number(id), title);
      res.status(200).json(updatedQuiz);
    } catch (error) {
      res.status(500).json({ error: 'une erreur est survenue' });
    }
  }

  async deleteQuiz(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await quizService.deleteQuiz(Number(id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'une erreur est survenue' });
    }
  }
}
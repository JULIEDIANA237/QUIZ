import { Router } from 'express';
import { QuizQuestionsController } from '../controllers/quizQuestions.controller';

const router = Router();
const quizQuestionsController = new QuizQuestionsController();

// Ajouter une question à un quiz
router.post('/quiz-questions', quizQuestionsController.addQuestionToQuiz);

// Récupérer les questions d'un quiz
router.get('/quiz-questions/:quizId', quizQuestionsController.getQuestionsByQuiz);

// Retirer une question d'un quiz
router.delete('/quiz-questions', quizQuestionsController.removeQuestionFromQuiz);

export default router;

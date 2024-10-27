import { Router } from 'express';
import { QuizController } from '../controllers/quiz.controller';

const router = Router();
const quizController = new QuizController();

router.post('/', quizController.createQuiz);
router.get('/', quizController.getAllQuizzes);
router.get('/:id', quizController.getQuizById);
router.put('/:id', quizController.updateQuiz);
router.delete('/:id', quizController.deleteQuiz);

export default router;
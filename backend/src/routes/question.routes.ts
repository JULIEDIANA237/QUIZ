import { Router } from 'express';
import { getQuestions, createQuestion, updateQuestionById, deleteQuestionById } from '../controllers/question.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Route pour récupérer les questions par langue et niveau de difficulté
router.get('/quiz', getQuestions);

// Route pour ajouter une nouvelle question (nécessite une authentification)
router.post('/', authMiddleware, createQuestion);

// Route pour mettre à jour une question (nécessite une authentification)
router.put('/:id', authMiddleware, updateQuestionById);

// Route pour supprimer une question (nécessite une authentification)
router.delete('/:id', authMiddleware, deleteQuestionById);

export default router;

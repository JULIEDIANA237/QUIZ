import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { ScoreController } from '../controllers/score.controller';

const router = Router();
const scoreController = new ScoreController();

router.post('/save', authMiddleware, scoreController.createScore);
router.get('/best',authMiddleware, scoreController.getBestScore);
router.get('/:id', scoreController.getScoreById);
router.put('/:id', scoreController.updateScore);
router.delete('/:id', scoreController.deleteScore);

export default router;
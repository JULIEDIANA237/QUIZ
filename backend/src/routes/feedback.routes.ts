// src/routes/feedback.routes.ts
import { Router } from 'express';
import { FeedbackController } from '../controllers/feedback.controller';

const router = Router();
const feedbackController = new FeedbackController();

router.post('/feedback', feedbackController.createFeedback);
router.get('/feedback', feedbackController.getFeedbacks);

export default router;

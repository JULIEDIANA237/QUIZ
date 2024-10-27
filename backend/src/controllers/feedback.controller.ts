// src/controllers/feedback.controller.ts
import { Request, Response } from 'express';
import { FeedbackService } from '../services/feedback.service';

const feedbackService = new FeedbackService();

export class FeedbackController {
  async createFeedback(req: Request, res: Response) {
    const { comment, rating, userId } = req.body;
    const feedback = await feedbackService.createFeedback({ comment, rating, userId });
    res.status(201).json(feedback);
  }

  async getFeedbacks(req: Request, res: Response) {
    const feedbacks = await feedbackService.getAllFeedbacks();
    res.json(feedbacks);
  }
}

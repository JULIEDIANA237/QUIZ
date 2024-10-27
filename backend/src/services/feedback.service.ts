// src/services/feedback.service.ts
import Feedback from '../models/feedback.model';

export class FeedbackService {
  async createFeedback(data: { comment: string, rating: number, userId: number }) {
    return await Feedback.create(data);
  }

  async getAllFeedbacks() {
    return await Feedback.findAll();
  }
}

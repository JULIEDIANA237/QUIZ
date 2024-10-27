import { QuizQuestions } from '../models/quizQuestions.model'; // Votre modèle QuizQuestions
import { Question } from '../models/question.model';
import { Quiz } from '../models/quiz.model';

export class QuizQuestionsService {
  // Ajouter une question à un quiz
  async addQuestionToQuiz(quizId: number, questionId: number) {
    try {
      const quizQuestion = await QuizQuestions.create({
        quizId: quizId,
        questionId: questionId,
      });
      return quizQuestion;
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
  async getQuestionsByQuiz(quizId: number) {
    try {
      const quiz = await Quiz.findByPk(quizId, {
        include: [
          {
            model: Question,
            as: 'questions',  // 'questions' doit être l'alias utilisé dans la relation
            through: { attributes: [] }, // Ne pas inclure les détails de la table pivot
          },
        ],
      });

      if (!quiz) {
        throw new Error('Quiz non trouvé');
      }

      return quiz.questions; // Maintenant, 'questions' est reconnu
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
  async removeQuestionFromQuiz(quizId: number, questionId: number) {
    try {
      const result = await QuizQuestions.destroy({
        where: {
          quizId: quizId,
          questionId: questionId,
        },
      });
      if (result === 0) {
        throw new Error('Relation non trouvée');
      }
      return { message: 'Question retirée du quiz avec succès' };
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

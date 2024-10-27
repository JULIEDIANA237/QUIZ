import { Question } from './Question';

export interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  loading: boolean; // Assurez-vous d'inclure cela
}

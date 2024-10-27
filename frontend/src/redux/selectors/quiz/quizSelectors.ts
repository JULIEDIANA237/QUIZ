import { RootState } from '../../store';

export const selectCurrentQuestion = (state: RootState) => 
  state.quiz.questions[state.quiz.currentQuestionIndex];
export const selectBestScore = (state: RootState) => state.quiz.bestScore;
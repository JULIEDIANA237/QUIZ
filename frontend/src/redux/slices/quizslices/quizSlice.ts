import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Question } from '../../../interfaces/Question';
import { fetchQuizData } from '../../thunks/quizthunk/fetchQuizData';
import { saveUserScore, fetchBestScore } from '../../thunks/score/scoreThunks';

interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  language: string;
  category: string;
  difficulty: string;
  isFinished: boolean;
  bestScore: number | null;
  saveScoreError: string | null;
  fetchBestScoreError: string | null;
}

const initialState: QuizState = {
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  language: 'en',
  category: '',
  difficulty: '',
  isFinished: false,
  bestScore: null,
  saveScoreError: null,
  fetchBestScoreError: null,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setDifficulty: (state, action: PayloadAction<string>) => {
      state.difficulty = action.payload;
    },
    nextQuestion: (state) => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
      } else {
        state.isFinished = true;
      }
    },
    incrementScore: (state) => {
      state.score += 1;
    },
    resetQuiz: (state) => {
      state.currentQuestionIndex = 0;
      state.score = 0;
      state.isFinished = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Gestion du thunk fetchQuizData
      .addCase(fetchQuizData.fulfilled, (state, action: PayloadAction<Question[]>) => {
        state.questions = action.payload;
      })
      .addCase(fetchQuizData.rejected, (state, action) => {
        console.error('Erreur lors de la récupération des données du quiz:', action.payload);
      })
      // Gestion du thunk saveUserScore
      .addCase(saveUserScore.rejected, (state, action) => {
        state.saveScoreError = action.payload as string;
      })
      // Gestion du thunk fetchBestScore
      .addCase(fetchBestScore.fulfilled, (state, action: PayloadAction<number>) => {
        state.bestScore = action.payload;
      })
      .addCase(fetchBestScore.rejected, (state, action) => {
        state.fetchBestScoreError = action.payload as string;
      });
  },
});

export const {
  setLanguage,
  setCategory,
  setDifficulty,
  nextQuestion,
  incrementScore,
  resetQuiz,
} = quizSlice.actions;

export default quizSlice.reducer;


import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchQuestions } from '../../../services/quizservice/quizService';

// Action pour récupérer les données du quiz
export const fetchQuizData = createAsyncThunk(
  'quiz/fetchQuizData',
  async (
    { category, difficulty, language }: { category: string; difficulty: string; language: string },
    { rejectWithValue }
  ) => {
    try {
      // Récupérer le token de l'utilisateur depuis localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('User not authenticated');  // Gérer les erreurs si le token est manquant
      }

      // Appeler la fonction fetchQuestions avec le token
      const questions = await fetchQuestions(category, difficulty, language, token);
      return questions;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch quiz data');  // Gestion des erreurs
    }
  }
);

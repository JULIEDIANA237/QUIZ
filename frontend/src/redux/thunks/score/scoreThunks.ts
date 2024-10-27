import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../utils/constants';

// Thunk pour sauvegarder le score
export const saveUserScore = createAsyncThunk(
  'score/saveScore',
  async (score: number, { rejectWithValue }) => {
    const token = localStorage.getItem('authToken');  // Récupère le token depuis localStorage
    if (!token) {
      return rejectWithValue('No token found');
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/scores/save`, 
        { score },  // Corps de la requête avec le score
        {
          headers: {
            Authorization: `Bearer ${token}`,  // En-tête avec le token
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to save score');
    }
  }
);

  

// Thunk pour récupérer le meilleur score
export const fetchBestScore = createAsyncThunk(
  'score/fetchBestScore',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('fetchBestScore: No token found');
      return rejectWithValue('No token found');
    }

    try {
      const response = await axios.get(`${BASE_URL}/api/scores/best`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('fetchBestScore: Best score retrieved:', response.data.score);
      return response.data.score;  // Récupération correcte du score
    } catch (error) {
      console.error('fetchBestScore: Failed to fetch best score', error);
      return rejectWithValue('Failed to fetch best score');
    }
  }
);


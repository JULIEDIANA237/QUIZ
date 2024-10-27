import axios from 'axios';
import { Question } from '../../interfaces/Question';
import { BASE_URL } from '../../utils/constants';

// Fonction pour récupérer les questions du quiz
export const fetchQuestions = async (category: string, difficulty: string, language: string, token: string) => {
  const response = await axios.get<Question[]>(`${BASE_URL}/api/questions/quiz`, {
    params: { category, difficulty, language },  // Inclure les paramètres requis
    headers: {
      Authorization: `Bearer ${token}`,  // Ajouter le token à l'en-tête
    },
  });
  return response.data;  // Retourner les données des questions
};

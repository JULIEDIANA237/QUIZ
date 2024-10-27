// authService.ts
import axios from 'axios';
import { BASE_URL } from '../../src/utils/constants';
import { AuthResponse } from '../../src/interfaces/AuthResponse';

const login = async (email: string, password: string): Promise<AuthResponse> => {
  console.log("Tentative de connexion pour l'utilisateur:", email);
  const response = await axios.post(`${BASE_URL}/api/auth/login`, { email, password });
  console.log("Réponse de l'API pour le login:", response.data); // Log pour vérifier la réponse
  return response.data;
};

const register = async (name: string, email: string, password: string): Promise<AuthResponse> => {
  console.log("Tentative d'inscription pour l'utilisateur:", name, email);
  const response = await axios.post(`${BASE_URL}/api/auth/register`, { name, email, password });
  console.log("Réponse de l'API pour l'inscription:", response.data); // Log pour vérifier la réponse
  return response.data;
};

const logout = () => {
  console.log("Déconnexion de l'utilisateur");
  localStorage.removeItem('authToken');
  localStorage.removeItem('authUser');
};

const saveAuthData = (authResponse: AuthResponse) => {
  console.log("Enregistrement des données d'authentification dans le localStorage:", authResponse);
  localStorage.setItem('authToken', authResponse.token);
  localStorage.setItem('authUser', JSON.stringify(authResponse.user));
};

const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

const getAuthUser = () => {
  const user = localStorage.getItem('authUser');
  return user ? JSON.parse(user) : null;
};

export const authService = {
  login,
  register,
  logout,
  saveAuthData,
  getAuthToken,
  getAuthUser,
};

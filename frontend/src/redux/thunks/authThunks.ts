// authThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../services/authService';
import { AuthResponse } from '../../interfaces/AuthResponse';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      console.log("Action loginUser déclenchée");
      const response: AuthResponse = await authService.login(email, password);
      console.log("Token généré et reçu lors de la connexion:", response.token);
      authService.saveAuthData(response);
      return response;
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        console.log("Erreur de connexion : email ou mot de passe incorrect");
        return thunkAPI.rejectWithValue('Email ou mot de passe incorrect');
      }
      console.error("Erreur de connexion:", error);
      return thunkAPI.rejectWithValue('Échec de la connexion');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ name, email, password }: { name: string; email: string; password: string }, thunkAPI) => {
    try {
      console.log("Action registerUser déclenchée");
      const response: AuthResponse = await authService.register(name, email, password);
      console.log("Token généré et reçu lors de l'inscription:", response.token);
      authService.saveAuthData(response);
      return response;
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        console.log("Erreur d'inscription : l'utilisateur existe déjà");
        return thunkAPI.rejectWithValue('Cet utilisateur a déjà un compte');
      }
      console.error("Erreur d'inscription:", error);
      return thunkAPI.rejectWithValue("Échec de l'enregistrement");
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, thunkAPI) => {
  console.log("Action logoutUser déclenchée");
  authService.logout();
});

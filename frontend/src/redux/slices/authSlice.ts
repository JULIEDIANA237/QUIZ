// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser, registerUser, logoutUser } from '../thunks/authThunks';
import { User } from '../../interfaces/User';
import { AuthResponse } from '../../interfaces/AuthResponse';

interface AuthState {
  token: string | null;
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const storedToken = localStorage.getItem('authToken');
const storedUser = localStorage.getItem('authUser');

let parsedUser: User | null = null;

if (storedUser) {
  try {
    parsedUser = JSON.parse(storedUser);
  } catch (error) {
    console.error("Erreur lors du parsing de l'utilisateur stocké:", error);
    localStorage.removeItem('authUser');
    parsedUser = null;
  }
}

const initialState: AuthState = {
  token: storedToken ? storedToken : null,
  user: parsedUser,
  status: 'idle',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        console.log("Connexion en cours...");
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.status = 'succeeded';
        console.log("Connexion réussie, token sauvegardé:", action.payload.token);
        localStorage.setItem('authToken', action.payload.token);
        localStorage.setItem('authUser', JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = 'failed';
        console.log("Échec de la connexion");
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.status = 'succeeded';
        console.log("Inscription réussie, token sauvegardé:", action.payload.token);
        localStorage.setItem('authToken', action.payload.token);
        localStorage.setItem('authUser', JSON.stringify(action.payload.user));
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.status = 'idle';
        console.log("Déconnexion réussie, données locales nettoyées");
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
      });
  },
});

export default authSlice.reducer;

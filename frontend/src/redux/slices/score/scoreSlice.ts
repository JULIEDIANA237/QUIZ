import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { saveUserScore, fetchBestScore } from '../../thunks/score/scoreThunks'; // Chemin vers votre fichier thunks

interface ScoreState {
  score: number;
  bestScore: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: ScoreState = {
  score: 0,
  bestScore: null,
  loading: false,
  error: null,
};

const scoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    resetScore: (state) => {
      state.score = 0;
      state.bestScore = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Gestion des états pour la sauvegarde du score
    builder
      .addCase(saveUserScore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveUserScore.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.score = action.payload; // Vous pouvez gérer le score ici si nécessaire
      })
      .addCase(saveUserScore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Gestion des états pour la récupération du meilleur score
      .addCase(fetchBestScore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBestScore.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.bestScore = action.payload;
      })
      .addCase(fetchBestScore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetScore } = scoreSlice.actions;
export default scoreSlice.reducer;

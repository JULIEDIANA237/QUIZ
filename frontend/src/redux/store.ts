import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import quizReducer from './slices/quizslices/quizSlice';
import scoreReducer from './slices/score/scoreSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    quiz: quizReducer,
    score: scoreReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

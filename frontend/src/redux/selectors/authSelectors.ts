// authSelectors.ts
import { RootState } from '../store';

export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectAuthUser = (state: RootState) => state.auth.user;

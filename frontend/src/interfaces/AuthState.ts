import { User } from './User';

export interface AuthState {
    isAuthenticated: boolean;
    token: string;
    userId: string;
  }
  
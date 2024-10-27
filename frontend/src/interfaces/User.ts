// interfaces/User.ts
export interface User {
  id: string;
  email: string;
  role: 'admin' | 'player';
  name?: string; // Le champ `name` est maintenant facultatif
}

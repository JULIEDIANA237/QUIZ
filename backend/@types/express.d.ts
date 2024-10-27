// @types/express/index.d.ts ou src/types.d.ts

import { User } from '../src/models/user.model'; // Ou l'endroit où se trouve le modèle utilisateur

declare global {
  namespace Express {
    interface Request {
      user?: User; // Vous pouvez ajuster le type ici en fonction du type de l'utilisateur
    }
  }
}

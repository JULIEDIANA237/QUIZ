import express from 'express';
import cors from 'cors';  // Importer le middleware CORS
//import todoRoutes from './routes/todoRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Utiliser le middleware CORS pour permettre les requêtes depuis n'importe quel domaine
app.use(cors({
  origin: 'http://localhost:3000'
}));
  // Permettre les requêtes cross-origin

// Middleware pour parser le body des requêtes
app.use(express.json());

// Routes
//app.use('/api', todoRoutes);

// Middleware de gestion d'erreurs global (simplifié)
app.use((err: any, req: any, res: any, next: any) => {
  res.status(500).json({ message: err.message });
});

export default app;

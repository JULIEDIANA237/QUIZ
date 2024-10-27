import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';  // Importer dotenv
import questionRoutes from './routes/question.routes';
import userRoutes from './routes/user.routes';
import scoreRoutes from './routes/score.routes';
import authRoutes from './routes/auth.routes';
import categoryRoutes from './routes/category.routes';
import feedbackRoutes from './routes/feedback.routes';
import { sequelize } from './config/database';
import quizRoutes from './routes/quiz.routes';
import quizQuestionsRoutes from './routes/quizQuestions.routes';

// Charger dotenv
dotenv.config();  // Charger les variables d'environnement depuis le fichier .env
console.log('Clé JWT_SECRET:', process.env.JWT_SECRET);

// Créez une instance de l'application Express
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',  // Modifiez selon votre frontend
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
}));

// Middleware pour parser les JSON
app.use(express.json());

// Routes API
app.use('/api/questions', questionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/scores', scoreRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api', categoryRoutes);
app.use('/api', feedbackRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api', quizQuestionsRoutes);


// Démarrage du serveur
const startServer = async () => {
  try {
    // Test de connexion à la base de données
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    // Synchronisation des modèles
    await sequelize.sync({ alter: true });
    console.log('Models synchronized successfully.');

    // Démarrage du serveur Express sur le port
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1); // Arrêter le processus en cas d'erreur
  }
};

// Appeler la fonction pour démarrer le serveur
startServer();

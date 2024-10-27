/*import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
import { User } from '../models/user.model';
import { Question } from '../models/question.model';
import { Score } from '../models/score.model';

dotenv.config(); // Charger les variables d'environnement

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

// Définir les relations entre les modèles
const defineRelations = () => {
  // Un utilisateur peut avoir plusieurs scores
  User.hasMany(Score, {
    foreignKey: 'userId',
    as: 'scores',
  });
  Score.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
  });

  // Un utilisateur peut poser plusieurs questions
  User.hasMany(Question, {
    foreignKey: 'userId',
    as: 'questions',
  });
  Question.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
  });

  // Un score est associé à une question (optionnel, selon votre cas d'utilisation)
  Question.hasMany(Score, {
    foreignKey: 'questionId',
    as: 'scores',
  });
  Score.belongsTo(Question, {
    foreignKey: 'questionId',
    as: 'question',
  });
};

// Synchroniser les modèles avec la base de données
export const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    // Définir les relations avant la synchronisation
    defineRelations();

    // Synchroniser les modèles avec la base de données
    await sequelize.sync({ alter: true });
    console.log('Models synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// Exporter l'instance sequelize et les modèles
export { sequelize, User, Question, Score };*/

import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();


const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  },
  
);

export { sequelize };


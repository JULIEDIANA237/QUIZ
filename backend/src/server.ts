import app from './app';
import { Sequelize } from 'sequelize';
import sequelize from './config/db'; // Ton fichier de configuration Sequelize

// Test de la connexion à la base de données
sequelize.authenticate()
  .then(() => {
    console.log('Connection to MySQL has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('quiz_database', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;

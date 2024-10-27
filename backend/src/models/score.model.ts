import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { Quiz } from './quiz.model';
import { User } from './user.model';

export class Score extends Model {
  public id!: number;
  public userId!: number;
  public score!: number;

  static associate() {
    Score.belongsTo(User, { foreignKey: 'userId', as: 'user' });
  }
}

Score.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'scores',
    timestamps: true,
  }
);

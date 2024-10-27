// src/models/feedback.model.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import {User} from './user.model';

class Feedback extends Model {
  public id!: number;
  public comment!: string;
  public rating!: number;
  public userId!: number;

  // Association
  public static associate() {
    Feedback.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user',
    });
  }
}

Feedback.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
}, {
  sequelize,
  tableName: 'feedbacks',
  timestamps: true,
});

export default Feedback;

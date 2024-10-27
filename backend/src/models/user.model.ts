// src/models/user.model.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import Feedback from './feedback.model';

export class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: 'admin' | 'player';

  // Association
  public static associate() {
    User.hasMany(Feedback, {
      foreignKey: 'userId',
      as: 'feedbacks',
    });
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('admin', 'player'),
    defaultValue: 'player',
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'users',
  timestamps: true,
});

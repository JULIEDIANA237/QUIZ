import { Model, DataTypes } from 'sequelize';
import {sequelize} from '../config/database'; // Assurez-vous que votre configuration de base de données est correcte
import { Question } from './question.model';

export class Category extends Model {
  public id!: number;
  public name!: string;
  
  

  // Association
  public static associate() {
    Category.hasMany(Question, {
      foreignKey: 'categoryId',
      as: 'questions',
    });
  }
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'categories',
    timestamps: true,
  }
);

//export default Category;

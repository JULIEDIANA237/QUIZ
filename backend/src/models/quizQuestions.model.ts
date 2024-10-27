import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export class QuizQuestions extends Model {
  public quizId!: number;
  public questionId!: number;
}

QuizQuestions.init(
  {
    quizId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'quizzes',
        key: 'id',
      },
      onDelete: 'CASCADE',
      primaryKey: true, // Clé primaire composite
    },
    questionId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'questions',
        key: 'id',
      },
      onDelete: 'CASCADE',
      primaryKey: true, // Clé primaire composite
    },
  },
  {
    sequelize,
    tableName: 'quiz_questions',
    timestamps: true, // Vous pouvez choisir true ou false selon vos besoins
  }
);

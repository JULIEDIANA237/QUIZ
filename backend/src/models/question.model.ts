import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { Category } from './category.model';
import { Quiz } from './quiz.model';



export class Question extends Model {
  public id!: number;
  public content!: string;
  public answers!: string;
  public correctAnswer!: string;
  public language!: string;
  public difficulty!: string;
  public categoryId!: number;
  
  // Ajout de la propriété quizzes pour la relation many-to-many
  public quizzes?: Quiz[];  // Indique que Question peut être dans plusieurs Quiz
  // Association
  static associate() {
    // Question liée à une catégorie
    Question.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

    // Question peut appartenir à plusieurs quiz
    Question.belongsToMany(Quiz, { through: 'QuizQuestions', foreignKey: 'questionId' });
  }
}

Question.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answers: {
      type: DataTypes.TEXT, // Utilisez TEXT pour stocker les données sous forme de chaîne JSON
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('answers');
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value: string[]) {
        this.setDataValue('answers', JSON.stringify(value)); // Conversion du tableau en JSON
      },
    },
    correctAnswer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    tableName: 'questions',
    timestamps: true,
  }
);

// Ajoutez l'association côté Question aussi
Question.belongsToMany(Quiz, {
  through: 'quiz_questions',
  foreignKey: 'questionId',
  otherKey: 'quizId',
});
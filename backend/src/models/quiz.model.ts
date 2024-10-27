import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { Question } from './question.model';  // Import du modèle Question


export class Quiz extends Model {
  public id!: number;
  public title!: string; // Vous pouvez utiliser un titre si nécessaire
    // Ajout de la propriété questions pour la relation many-to-many
  public questions?: Question[];  // Indique que Quiz peut avoir plusieurs Questions
}

Quiz.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true, // Si vous décidez de ne pas obliger un titre
    },
  },
  {
    sequelize,
    tableName: 'quizzes',
    timestamps: true, // Pour createdAt et updatedAt
  }
);

// L'association belongsToMany doit se faire avec un modèle valide
/*Quiz.belongsToMany(Question, {
  through: 'quiz_questions',
  foreignKey: 'quizId',
  otherKey: 'questionId',
});*/

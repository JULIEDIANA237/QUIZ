'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('quiz_questions', {
      quizId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'quizzes',
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false,
        primaryKey: true, // Clé primaire composite
      },
      questionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'questions',
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false,
        primaryKey: true, // Clé primaire composite
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('quiz_questions');
  },
};

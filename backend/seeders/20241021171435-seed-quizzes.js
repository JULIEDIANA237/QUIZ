'use strict';
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Quizzes', [
      {
        title: 'Quiz général sur l\'Afrique',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'General Quiz on Africa',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Quizzes', null, {});
  },
};

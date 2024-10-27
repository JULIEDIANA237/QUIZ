'use strict';
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('QuizQuestions', [
      // Associer des questions de catégorie "Histoire" au quiz "Quiz sur l'Afrique - Histoire (Français)"
      { quizId: 1, questionId: 1 }, // Associe une question d’histoire en français au premier quiz
      { quizId: 1, questionId: 3 },
      
      // Associer des questions de catégorie "Histoire" au quiz "Quiz on Africa - History (English)"
      { quizId: 2, questionId: 2 }, // Associe une question d’histoire en anglais au deuxième quiz
      { quizId: 2, questionId: 4 },
      
      // Associer des questions de catégorie "Géographie" au quiz "Quiz sur l'Afrique - Géographie (Français)"
      { quizId: 3, questionId: 5 },
      { quizId: 3, questionId: 7 },
      
      // Associer des questions de catégorie "Géographie" au quiz "Quiz on Africa - Geography (English)"
      { quizId: 4, questionId: 6 },
      { quizId: 4, questionId: 8 },

      // Associer des questions de catégorie "Culture" au quiz "Quiz sur l'Afrique - Culture (Français)"
      { quizId: 5, questionId: 9 },
      { quizId: 5, questionId: 11 },

      // Associer des questions de catégorie "Culture" au quiz "Quiz on Africa - Culture (English)"
      { quizId: 6, questionId: 10 },
      { quizId: 6, questionId: 12 },

      // Associer des questions de catégorie "Science" au quiz "Quiz sur l'Afrique - Science (Français)"
      { quizId: 7, questionId: 13 },
      { quizId: 7, questionId: 15 },

      // Associer des questions de catégorie "Science" au quiz "Quiz on Africa - Science (English)"
      { quizId: 8, questionId: 14 },
      { quizId: 8, questionId: 16 },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('QuizQuestions', null, {});
  },
};

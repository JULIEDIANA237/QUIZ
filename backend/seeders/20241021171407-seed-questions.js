'use strict';
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Questions', [
      // Niveau easy déjà fourni
      {
        content: 'Quelle est la capitale de l\'Afrique du Sud?',
        answers: JSON.stringify(['Johannesburg', 'Cape Town', 'Pretoria', 'Durban']),
        correctAnswer: 'Pretoria',
        language: 'fr',
        difficulty: 'easy',
        categoryId: 1, // Histoire
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'What is the capital of South Africa?',
        answers: JSON.stringify(['Johannesburg', 'Cape Town', 'Pretoria', 'Durban']),
        correctAnswer: 'Pretoria',
        language: 'en',
        difficulty: 'easy',
        categoryId: 1, // History
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'Quel est le plus grand pays d\'Afrique?',
        answers: JSON.stringify(['Algérie', 'Nigeria', 'Soudan', 'Tanzanie']),
        correctAnswer: 'Algérie',
        language: 'fr',
        difficulty: 'easy',
        categoryId: 3, // Géographie
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'What is the largest country in Africa?',
        answers: JSON.stringify(['Algeria', 'Nigeria', 'Sudan', 'Tanzania']),
        correctAnswer: 'Algeria',
        language: 'en',
        difficulty: 'easy',
        categoryId: 3, // Geography
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'Quelle est la langue la plus parlée en Afrique?',
        answers: JSON.stringify(['Français', 'Anglais', 'Arabe', 'Swahili']),
        correctAnswer: 'Swahili',
        language: 'fr',
        difficulty: 'easy',
        categoryId: 4, // Culture
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'What is the most spoken language in Africa?',
        answers: JSON.stringify(['French', 'English', 'Arabic', 'Swahili']),
        correctAnswer: 'Swahili',
        language: 'en',
        difficulty: 'easy',
        categoryId: 4, // Culture
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Ajout du niveau medium
      {
        content: 'Quel pays africain a accueilli la Coupe du monde de football en 2010?',
        answers: JSON.stringify(['Afrique du Sud', 'Nigeria', 'Egypte', 'Cameroun']),
        correctAnswer: 'Afrique du Sud',
        language: 'fr',
        difficulty: 'medium',
        categoryId: 1, // Histoire
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'Which African country hosted the 2010 FIFA World Cup?',
        answers: JSON.stringify(['South Africa', 'Nigeria', 'Egypt', 'Cameroon']),
        correctAnswer: 'South Africa',
        language: 'en',
        difficulty: 'medium',
        categoryId: 1, // History
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'Quel désert couvre une grande partie de l\'Afrique du Nord?',
        answers: JSON.stringify(['Sahara', 'Kalahari', 'Namib', 'Gobi']),
        correctAnswer: 'Sahara',
        language: 'fr',
        difficulty: 'medium',
        categoryId: 3, // Géographie
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'Which desert covers much of North Africa?',
        answers: JSON.stringify(['Sahara', 'Kalahari', 'Namib', 'Gobi']),
        correctAnswer: 'Sahara',
        language: 'en',
        difficulty: 'medium',
        categoryId: 3, // Geography
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Ajout du niveau hard
      {
        content: 'Qui était le premier président de l\'Afrique du Sud après la fin de l\'apartheid?',
        answers: JSON.stringify(['Nelson Mandela', 'Thabo Mbeki', 'FW de Klerk', 'Jacob Zuma']),
        correctAnswer: 'Nelson Mandela',
        language: 'fr',
        difficulty: 'hard',
        categoryId: 1, // Histoire
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'Who was the first president of South Africa after the end of apartheid?',
        answers: JSON.stringify(['Nelson Mandela', 'Thabo Mbeki', 'FW de Klerk', 'Jacob Zuma']),
        correctAnswer: 'Nelson Mandela',
        language: 'en',
        difficulty: 'hard',
        categoryId: 1, // History
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'Quelle montagne est la plus haute en Afrique?',
        answers: JSON.stringify(['Mont Kilimanjaro', 'Mont Kenya', 'Mont Elgon', 'Rwenzori']),
        correctAnswer: 'Mont Kilimanjaro',
        language: 'fr',
        difficulty: 'hard',
        categoryId: 3, // Géographie
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'What is the tallest mountain in Africa?',
        answers: JSON.stringify(['Mount Kilimanjaro', 'Mount Kenya', 'Mount Elgon', 'Rwenzori']),
        correctAnswer: 'Mount Kilimanjaro',
        language: 'en',
        difficulty: 'hard',
        categoryId: 3, // Geography
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Questions', null, {});
  },
};

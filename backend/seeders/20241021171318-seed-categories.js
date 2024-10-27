'use strict';
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Categories', [
      { id: 1, name_fr: 'Histoire', name_en: 'History', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name_fr: 'Science', name_en: 'Science', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, name_fr: 'Géographie', name_en: 'Geography', createdAt: new Date(), updatedAt: new Date() },
      { id: 4, name_fr: 'Culture', name_en: 'Culture', createdAt: new Date(), updatedAt: new Date() },
      { id: 5, name_fr: 'Sport', name_en: 'Sports', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};

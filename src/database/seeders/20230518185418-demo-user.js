'use strict';

const userData = require('./users.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const usersWithTimestamps = userData.map(user => ({
      ...user,
      createdAt: new Date(), // Define o valor atual para 'createdAt'
      updatedAt: new Date() // Define o valor atual para 'updatedAt'
    }));

    await queryInterface.bulkInsert('Users', usersWithTimestamps, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
'use strict';

const userData = require('./users.json');
const { hash } = require('bcryptjs'); 
const UsersController = require('../../controllers/UsersController.js');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const controller = new UsersController(); // Create an instance of UsersController
    const promises = userData.map(async user => {
      const passHash = await hash(user.password, 15);

      const userWithPassword = {
        ...user,
        password: passHash,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      return controller.postUser({ body: userWithPassword }); // Call the instance method
    });

    await Promise.all(promises);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};

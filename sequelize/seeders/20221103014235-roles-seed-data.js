'use strict'
const { SEED_ROLES } = require('../seed_data')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', SEED_ROLES, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {})
  }
}

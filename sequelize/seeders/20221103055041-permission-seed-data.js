'use strict'
const { SEED_PERMISSION } = require('../../models/seed_data')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('permissions', SEED_PERMISSION, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('permissions', null, {})
  }
}

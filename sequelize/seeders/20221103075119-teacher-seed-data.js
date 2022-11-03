'use strict'
const { SEED_TEACHER } = require('../../models/seed_data')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('teachers', SEED_TEACHER, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('teachers', null, {})
  }
}

'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('price_rules', 'is_published', {})
    await queryInterface.removeColumn('course_details', 'is_published', {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('price_rules', 'is_published', Sequelize.BOOLEAN, {})
    await queryInterface.addColumn('course_details', 'is_published', Sequelize.BOOLEAN, {})
  }
}

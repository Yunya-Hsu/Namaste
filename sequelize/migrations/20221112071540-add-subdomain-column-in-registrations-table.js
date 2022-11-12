'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('registrations', 'studio_subdomain', {
      type: Sequelize.STRING(20),
      allowNull: false
    }, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('registrations', 'studio_subdomain', {})
  }
}

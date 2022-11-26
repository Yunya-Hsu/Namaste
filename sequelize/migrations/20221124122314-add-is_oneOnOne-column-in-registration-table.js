'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('registrations', 'is_oneOnOne', {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: 0
    }, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('registrations', 'is_oneOnOne', {})
  }
}

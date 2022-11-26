'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('course_details', 'is_oneOnOne', {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: 0
    }, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('course_details', 'is_oneOnOne', {})
  }
}

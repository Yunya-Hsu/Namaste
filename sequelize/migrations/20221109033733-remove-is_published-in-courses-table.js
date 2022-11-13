'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('courses', 'is_published', {})
    await queryInterface.removeColumn('courses', 'publish_at', {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('courses', 'is_published', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    }, {})
    await queryInterface.addColumn('courses', 'publish_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: '2022-01-01 12:00:00'
    }, {})
  }
}

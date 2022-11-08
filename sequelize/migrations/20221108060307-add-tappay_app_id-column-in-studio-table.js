'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('studios', 'tappay_app_id', {
      type: Sequelize.CHAR(8),
      allowNull: false
    }, {})
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('studios', 'tappay_app_id', {})
  }
}

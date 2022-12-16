'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('teachers', 'introduction', {
      type: Sequelize.STRING
    }, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('teachers', 'introduction', {
      type: Sequelize.STRING(30)
    }, {})
  }
}

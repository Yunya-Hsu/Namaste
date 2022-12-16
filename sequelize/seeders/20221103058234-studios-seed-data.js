'use strict'
const currentTime = require('moment-timezone')().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')
const { SEED_STUDIO } = require('../seed_data')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    for (const studio of SEED_STUDIO) {
      studio.created_at = currentTime
      studio.updated_at = currentTime
    }

    await queryInterface.bulkInsert('studios', SEED_STUDIO, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('studios', null, {})
  }
}

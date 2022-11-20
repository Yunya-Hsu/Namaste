'use strict'
const currentTime = require('moment-timezone')().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')
const { SEED_USER_STUDIO_ROLE } = require('../seed_data')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    for (const i of SEED_USER_STUDIO_ROLE) {
      i.created_at = currentTime
      i.updated_at = currentTime
    }

    await queryInterface.bulkInsert('user_studio_role', SEED_USER_STUDIO_ROLE, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SEED_USER_STUDIO_ROLE', null, {})
  }
}

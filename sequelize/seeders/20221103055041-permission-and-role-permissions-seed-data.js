'use strict'
const currentTime = require('moment-timezone')().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')
const { SEED_PERMISSION, SEED_ROLE_PERMISSION } = require('../seed_data')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    for (const permission of SEED_PERMISSION) {
      permission.created_at = currentTime
      permission.updated_at = currentTime
    }
    for (const i of SEED_ROLE_PERMISSION) {
      i.created_at = currentTime
      i.updated_at = currentTime
    }

    await queryInterface.bulkInsert('permissions', SEED_PERMISSION, {})
    await queryInterface.bulkInsert('role_permissions', SEED_ROLE_PERMISSION, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('permissions', null, {})
    await queryInterface.bulkDelete('role_permissions', null, {})
  }
}

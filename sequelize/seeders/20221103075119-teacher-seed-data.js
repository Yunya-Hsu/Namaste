'use strict'
const currentTime = require('moment-timezone')().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')
const { SEED_TEACHER } = require('../seed_data')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    for (const teacher of SEED_TEACHER) {
      teacher.created_at = currentTime
      teacher.updated_at = currentTime
    }

    await queryInterface.bulkInsert('teachers', SEED_TEACHER, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('teachers', null, {})
  }
}

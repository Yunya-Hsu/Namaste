'use strict'
const currentTime = require('moment-timezone')().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')
const { SEED_COURSE } = require('../seed_data')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    for (const course of SEED_COURSE) {
      course.created_at = currentTime
      course.updated_at = currentTime
    }

    await queryInterface.bulkInsert('courses', SEED_COURSE, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('courses', null, {})
  }
}

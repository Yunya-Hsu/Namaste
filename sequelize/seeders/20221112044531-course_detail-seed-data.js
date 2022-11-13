'use strict'
const currentTime = require('moment-timezone')().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')
const { SEED_COURSE_DETAIL } = require('../seed_data')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    for (const detail of SEED_COURSE_DETAIL) {
      detail.publish_at = currentTime
      detail.created_at = currentTime
      detail.updated_at = currentTime
    }

    await queryInterface.bulkInsert('course_details', SEED_COURSE_DETAIL, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('course_details', null, {})
  }
}

'use strict'
const currentTime = require('moment-timezone')().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')
const argon2 = require('argon2')
const {
  PASSWORD,
  SEED_USERS_SUPER_ADMIN,
  SEED_USERS_STUDIO_OWNER,
  SEED_USERS_STUDIO_ASSISTANT,
  SEED_USERS_TEACHER,
  SEED_USERS_STUDENT
} = require('../seed_data')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const SEED_USERS_ALL = SEED_USERS_SUPER_ADMIN.concat(SEED_USERS_STUDIO_OWNER).concat(SEED_USERS_STUDIO_ASSISTANT).concat(SEED_USERS_TEACHER).concat(SEED_USERS_STUDENT)

    for (const user of SEED_USERS_ALL) {
      const password = await argon2.hash(PASSWORD)
      user.password = password
      user.created_at = currentTime
      user.updated_at = currentTime
    }

    await queryInterface.bulkInsert('users', SEED_USERS_ALL, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  }
}

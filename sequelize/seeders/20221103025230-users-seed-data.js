'use strict'
const { PASSWORD, SEED_USERS_SUPER_ADMIN, SEED_USERS_STUDIO_OWNER, SEED_USERS_TEACHER, SEED_USERS_STUDENT } = require('../seed_data')
const argon2 = require('argon2')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const superAdminRoleId = await queryInterface.rawSelect(
      'roles', {
        where: {
          role: 0
        }
      }, ['id'])
    for (const user of SEED_USERS_SUPER_ADMIN) {
      const password = await argon2.hash(PASSWORD)
      user.role_id = superAdminRoleId
      user.password = password
    }

    const studioOwnerRoleId = await queryInterface.rawSelect(
      'roles', {
        where: {
          role: 10
        }
      }, ['id'])
    for (const user of SEED_USERS_STUDIO_OWNER) {
      const password = await argon2.hash(PASSWORD)
      user.role_id = studioOwnerRoleId
      user.password = password
    }

    const teacherRoleId = await queryInterface.rawSelect(
      'roles', {
        where: {
          role: 20
        }
      }, ['id'])
    for (const user of SEED_USERS_TEACHER) {
      const password = await argon2.hash(PASSWORD)
      user.role_id = teacherRoleId
      user.password = password
    }

    const userRoleId = await queryInterface.rawSelect(
      'roles', {
        where: {
          role: 50
        }
      }, ['id'])
    for (const user of SEED_USERS_STUDENT) {
      const password = await argon2.hash(PASSWORD)
      user.role_id = userRoleId
      user.password = password
    }


    const SEED_USERS_ALL = SEED_USERS_SUPER_ADMIN.concat(SEED_USERS_STUDIO_OWNER).concat(SEED_USERS_TEACHER).concat(SEED_USERS_STUDENT)

    await queryInterface.bulkInsert('users', SEED_USERS_ALL, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  }
}

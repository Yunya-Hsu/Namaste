'use strict'
const { SEED_STUDIO } = require('../../models/seed_data')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const [[studioOwnerRoleId]] = await queryInterface.sequelize.query('SELECT id FROM roles WHERE role = 10')

    const [studioOwnerList] = await queryInterface.sequelize.query(`SELECT id FROM users WHERE role_id = ${studioOwnerRoleId.id}`)

    for (const studio of SEED_STUDIO) {
      const index = SEED_STUDIO.indexOf(studio)
      const managerId = studioOwnerList[index] ? studioOwnerList[index].id : studioOwnerList[studioOwnerList.length - 1].id

      studio.manager = managerId
    }
    await queryInterface.bulkInsert('studios', SEED_STUDIO, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('studios', null, {})
  }
}

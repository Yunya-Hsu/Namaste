'use strict'
const currentTime = require('moment-timezone')().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')
const { SEED_PRICE_RULES } = require('../seed_data')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    for (const rule of SEED_PRICE_RULES) {
      rule.created_at = currentTime
      rule.updated_at = currentTime
    }

    await queryInterface.bulkInsert('price_rules', SEED_PRICE_RULES, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('price_rules', null, {})
  }
}

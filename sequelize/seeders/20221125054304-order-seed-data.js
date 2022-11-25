'use strict'
const moment = require('moment-timezone')
const currentTime = require('moment-timezone')().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')
const { SEED_ORDER } = require('../seed_data')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    for (const order of SEED_ORDER) {
      order.date = currentTime
      order.expire_date = moment().tz('Asia/Taipei').add(order.expire_date, 'days').format('YYYY-MM-DD HH:mm:ss')
      order.created_at = currentTime
      order.updated_at = currentTime
    }
    await queryInterface.bulkInsert('orders', SEED_ORDER, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('orders', null, {})
  }
}

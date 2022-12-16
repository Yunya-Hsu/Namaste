'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // await queryInterface.addConstraint('studios', {
    //   fields: ['address'],
    //   type: 'FULLTEXT',
    //   name: 'studios_table_ft_constrain_address'
    // })
    // await queryInterface.addConstraint('courses', {
    //   fields: ['title'],
    //   type: 'FULLTEXT',
    //   name: 'courses_table_ft_constrain_title'
    // })

    await queryInterface.sequelize.query(
      'CREATE FULLTEXT INDEX studios_table_ft_constrain_address ON studios (address) WITH PARSER NGRAM;'
    )
    await queryInterface.sequelize.query(
      'CREATE FULLTEXT INDEX courses_table_ft_constrain_title ON courses (title) WITH PARSER NGRAM;'
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'ALTER TABLE courses DROP INDEX `courses_table_ft_constrain_title`;'
    )
    await queryInterface.sequelize.query(
      'ALTER TABLE studios DROP INDEX `studios_table_ft_constrain_address`;'
    )
  }
}

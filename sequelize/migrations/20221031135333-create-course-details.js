'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('course_details',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT.UNSIGNED
        },
        course_id: {
          allowNull: false,
          type: Sequelize.BIGINT.UNSIGNED
        },
        date: {
          allowNull: false,
          type: Sequelize.DATEONLY
        },
        start_time: {
          allowNull: false,
          type: Sequelize.TIME
        },
        duration: {
          allowNull: false,
          type: Sequelize.TINYINT.UNSIGNED
        },
        is_online: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
          defaultValue: 0
        },
        limitation: {
          allowNull: false,
          type: Sequelize.TINYINT.UNSIGNED
        },
        online_limitation: {
          allowNull: false,
          type: Sequelize.TINYINT.UNSIGNED,
          defaultValue: 0
        },
        is_published: {
          allowNull: false,
          type: Sequelize.BOOLEAN
        },
        publish_at: {
          allowNull: false,
          type: Sequelize.DATE
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE
        }
      },
      {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
      }
    )
    await queryInterface.addConstraint('course_details', {
      fields: ['course_id'],
      type: 'foreign key',
      references: {
        table: 'courses',
        field: 'id'
      },
      name: 'course_details_table_rules_fk_constrain_course'
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('course_details', 'course_details_table_rules_fk_constrain_course')
    await queryInterface.dropTable('course_details')
  }
}

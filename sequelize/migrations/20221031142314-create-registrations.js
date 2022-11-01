'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('registrations',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT.UNSIGNED
        },
        course_detail_id: {
          allowNull: false,
          type: Sequelize.BIGINT.UNSIGNED
        },
        user_id: {
          allowNull: false,
          type: Sequelize.BIGINT.UNSIGNED
        },
        studio_name: {
          allowNull: false,
          type: Sequelize.STRING
        },
        course_title: {
          allowNull: false,
          type: Sequelize.STRING
        },
        teacher_name: {
          allowNull: false,
          type: Sequelize.STRING
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
          type: Sequelize.TINYINT
        },
        point: {
          allowNull: false,
          type: Sequelize.TINYINT
        },
        is_online: {
          allowNull: false,
          type: Sequelize.BOOLEAN
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
    await queryInterface.addConstraint('registrations', {
      fields: ['course_detail_id'],
      type: 'foreign key',
      references: {
        table: 'course_details',
        field: 'id'
      },
      name: 'registration_table_rules_fk_constrain_course_detail'
    })
    await queryInterface.addConstraint('registrations', {
      fields: ['user_id'],
      type: 'foreign key',
      references: {
        table: 'users',
        field: 'id'
      },
      name: 'registration_table_rules_fk_constrain_user'
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('registrations', 'registration_table_rules_fk_constrain_user')
    await queryInterface.removeConstraint('registrations', 'registration_table_rules_fk_constrain_course_detail')
    await queryInterface.dropTable('registrations')
  }
}

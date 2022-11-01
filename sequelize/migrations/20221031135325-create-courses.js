'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('courses',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT.UNSIGNED
        },
        title: {
          allowNull: false,
          type: Sequelize.STRING(30)
        },
        description: {
          type: Sequelize.STRING(100)
        },
        teacher_id: {
          allowNull: false,
          type: Sequelize.BIGINT.UNSIGNED
        },
        studio_id: {
          allowNull: false,
          type: Sequelize.BIGINT.UNSIGNED
        },
        user_id: {
          allowNull: false,
          type: Sequelize.BIGINT.UNSIGNED
        },
        point: {
          allowNull: false,
          type: Sequelize.TINYINT.UNSIGNED
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
    await queryInterface.addConstraint('courses', {
      fields: ['teacher_id'],
      type: 'foreign key',
      references: {
        table: 'teachers',
        field: 'id'
      },
      name: 'courses_table_rules_fk_constrain_teacher'
    })
    await queryInterface.addConstraint('courses', {
      fields: ['studio_id'],
      type: 'foreign key',
      references: {
        table: 'studios',
        field: 'id'
      },
      name: 'courses_table_rules_fk_constrain_studio'
    })
    await queryInterface.addConstraint('courses', {
      fields: ['user_id'],
      type: 'foreign key',
      references: {
        table: 'users',
        field: 'id'
      },
      name: 'courses_table_rules_fk_constrain_user'
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('courses', 'courses_table_rules_fk_constrain_user')
    await queryInterface.removeConstraint('courses', 'courses_table_rules_fk_constrain_studio')
    await queryInterface.removeConstraint('courses', 'courses_table_rules_fk_constrain_teacher')
    await queryInterface.dropTable('courses')
  }
}

'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('teachers',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT.UNSIGNED
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING(15)
        },
        avatar: {
          type: Sequelize.STRING
        },
        major: {
          allowNull: false,
          type: Sequelize.STRING(30)
        },
        introduction: {
          type: Sequelize.STRING(30)
        },
        studio_id: {
          allowNull: false,
          type: Sequelize.BIGINT.UNSIGNED
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
    await queryInterface.addConstraint('teachers', {
      fields: ['studio_id'],
      type: 'foreign key',
      references: {
        table: 'studios',
        field: 'id'
      },
      name: 'teachers_table_rules_fk_constrain_studio'
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('teachers', 'teachers_table_rules_fk_constrain_studio')
    await queryInterface.dropTable('teachers')
  }
}

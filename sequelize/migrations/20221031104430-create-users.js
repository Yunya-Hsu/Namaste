'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT.UNSIGNED
        },
        role_id: {
          allowNull: false,
          type: Sequelize.TINYINT.UNSIGNED
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING(20)
        },
        email: {
          allowNull: false,
          type: Sequelize.STRING
        },
        password: {
          allowNull: false,
          type: Sequelize.STRING(100)
        },
        is_validate: {
          type: Sequelize.BOOLEAN,
          defaultValue: 0
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
    await queryInterface.addConstraint('users', {
      fields: ['role_id'],
      type: 'foreign key',
      references: {
        table: 'roles',
        field: 'id'
      },
      name: 'users_table_fk_constrain_role'
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('users', 'users_table_fk_constrain_role')
    await queryInterface.dropTable('users')
  }
}

'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user_studio_role',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT.UNSIGNED
        },
        user_id: {
          allowNull: false,
          type: Sequelize.BIGINT.UNSIGNED
        },
        studio_id: {
          allowNull: false,
          type: Sequelize.BIGINT.UNSIGNED
        },
        role_id: {
          allowNull: false,
          type: Sequelize.TINYINT.UNSIGNED
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
    await queryInterface.addConstraint('user_studio_role', {
      fields: ['user_id'],
      type: 'foreign key',
      references: {
        table: 'users',
        field: 'id'
      },
      name: 'user_studio_role_table_fk_constrain_user'
    })
    await queryInterface.addConstraint('user_studio_role', {
      fields: ['studio_id'],
      type: 'foreign key',
      references: {
        table: 'studios',
        field: 'id'
      },
      name: 'user_studio_role_table_fk_constrain_studio'
    })
    await queryInterface.addConstraint('user_studio_role', {
      fields: ['role_id'],
      type: 'foreign key',
      references: {
        table: 'roles',
        field: 'id'
      },
      name: 'user_studio_role_table_fk_constrain_role'
    })

    await queryInterface.removeConstraint('users', 'users_table_fk_constrain_role')
    await queryInterface.removeColumn('users', 'role_id', {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'role_id', {
      type: Sequelize.TINYINT.UNSIGNED
    }, {})
    await queryInterface.addConstraint('users', {
      fields: ['role_id'],
      type: 'foreign key',
      references: {
        table: 'roles',
        field: 'id'
      },
      name: 'users_table_fk_constrain_role'
    })

    await queryInterface.dropTable('user_studio_role')
  }
}

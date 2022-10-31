'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('role_permissions',
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
        permission_id: {
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
    await queryInterface.addConstraint('role_permissions', {
      fields: ['permission_id'],
      type: 'foreign key',
      references: {
        table: 'permissions',
        field: 'id'
      },
      name: 'role_permissions_table_fk_constrain_permission'
    })
    await queryInterface.addConstraint('role_permissions', {
      fields: ['role_id'],
      type: 'foreign key',
      references: {
        table: 'roles',
        field: 'id'
      },
      name: 'role_permissions_table_fk_constrain_role'
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('role_permissions', 'role_permissions_table_fk_constrain_role')
    await queryInterface.removeConstraint('role_permissions', 'role_permissions_table_fk_constrain_permission')
    await queryInterface.dropTable('role_permissions')
  }
}

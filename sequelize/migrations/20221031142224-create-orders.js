'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('orders',
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
        date: {
          allowNull: false,
          type: Sequelize.DATE
        },
        total: {
          allowNull: false,
          type: Sequelize.MEDIUMINT.UNSIGNED
        },
        status: {
          allowNull: false,
          type: Sequelize.TINYINT,
          defaultValue: 0
        },
        tappay_trade_id: {
          type: Sequelize.STRING(20)
        },
        point: {
          allowNull: false,
          type: Sequelize.MEDIUMINT.UNSIGNED
        },
        expire_date: {
          allowNull: false,
          type: Sequelize.DATE
        },
        remaining_point: {
          allowNull: false,
          type: Sequelize.MEDIUMINT.UNSIGNED
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
    await queryInterface.addConstraint('orders', {
      fields: ['user_id'],
      type: 'foreign key',
      references: {
        table: 'users',
        field: 'id'
      },
      name: 'order_table_rules_fk_constrain_user'
    })
    await queryInterface.addConstraint('orders', {
      fields: ['studio_id'],
      type: 'foreign key',
      references: {
        table: 'studios',
        field: 'id'
      },
      name: 'order_table_rules_fk_constrain_studio'
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('orders', 'order_table_rules_fk_constrain_studio')
    await queryInterface.removeConstraint('orders', 'order_table_rules_fk_constrain_user')
    await queryInterface.dropTable('orders')
  }
}

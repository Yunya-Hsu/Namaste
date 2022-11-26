'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('registration_order',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT.UNSIGNED
        },
        registration_id: {
          allowNull: false,
          type: Sequelize.BIGINT.UNSIGNED
        },
        order_id: {
          allowNull: false,
          type: Sequelize.BIGINT.UNSIGNED
        },
        consume_point: {
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
    await queryInterface.addConstraint('registration_order', {
      fields: ['registration_id'],
      type: 'foreign key',
      references: {
        table: 'registrations',
        field: 'id'
      },
      name: 'registration_order_table_rules_fk_constrain_registration'
    })
    await queryInterface.addConstraint('registration_order', {
      fields: ['order_id'],
      type: 'foreign key',
      references: {
        table: 'orders',
        field: 'id'
      },
      name: 'registration_order_table_rules_fk_constrain_order'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('registration_order', 'registration_order_table_rules_fk_constrain_registration')
    await queryInterface.removeConstraint('registration_order', 'registration_order_table_rules_fk_constrain_order')
    await queryInterface.dropTable('registration_order')
  }
}


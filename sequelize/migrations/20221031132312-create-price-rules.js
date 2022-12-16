'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('price_rules',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT.UNSIGNED
        },
        studio_id: {
          allowNull: false,
          type: Sequelize.BIGINT.UNSIGNED
        },
        category: {
          allowNull: false,
          type: Sequelize.STRING(30)
        },
        price: {
          allowNull: false,
          type: Sequelize.MEDIUMINT.UNSIGNED
        },
        point: {
          allowNull: false,
          type: Sequelize.SMALLINT.UNSIGNED
        },
        remark: {
          type: Sequelize.STRING(50)
        },
        term: {
          allowNull: false,
          type: Sequelize.MEDIUMINT.UNSIGNED
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
    await queryInterface.addConstraint('price_rules', {
      fields: ['studio_id'],
      type: 'foreign key',
      references: {
        table: 'studios',
        field: 'id'
      },
      name: 'price_rules_table_fk_constrain_studio'
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('price_rules', 'price_rules_table_fk_constrain_studio')
    await queryInterface.dropTable('price_rules')
  }
}

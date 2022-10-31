'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('studios',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT.UNSIGNED
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING(30),
          unique: true
        },
        logo: {
          allowNull: false,
          type: Sequelize.STRING
        },
        introduction_title: {
          type: Sequelize.STRING(50)
        },
        introduction_detail: {
          type: Sequelize.STRING
        },
        introduction_photo: {
          type: Sequelize.STRING
        },
        subdomain: {
          allowNull: false,
          type: Sequelize.STRING(20),
          unique: true
        },
        manager: {
          allowNull: false,
          type: Sequelize.BIGINT.UNSIGNED
        },
        address: {
          allowNull: false,
          type: Sequelize.STRING(30)
        },
        address_description: {
          type: Sequelize.STRING
        },
        phone: {
          type: Sequelize.STRING(30)
        },
        tappay_app_key: {
          allowNull: false,
          type: Sequelize.STRING(70)
        },
        tappay_partner_key: {
          allowNull: false,
          type: Sequelize.STRING(70)
        },
        tappay_id: {
          allowNull: false,
          type: Sequelize.STRING(30)
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
    await queryInterface.addConstraint('studios', {
      fields: ['manager'],
      type: 'foreign key',
      references: {
        table: 'users',
        field: 'id'
      },
      name: 'studis_table_fk_constrain_manager'
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('studios', 'studis_table_fk_constrain_manager')
    await queryInterface.dropTable('studios')
  }
}

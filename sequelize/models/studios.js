'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class studios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  studios.init({
    name: DataTypes.STRING,
    logo: DataTypes.STRING,
    introduction_title: DataTypes.STRING,
    introduction_detail: DataTypes.STRING,
    introduction_photo: DataTypes.STRING,
    subdomain: DataTypes.STRING,
    manager: DataTypes.BIGINT,
    address: DataTypes.STRING,
    address_description: DataTypes.STRING,
    phone: DataTypes.STRING,
    tappay_app_key: DataTypes.STRING,
    tappay_partner_key: DataTypes.STRING,
    tappay_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'studios'
  })
  return studios
}

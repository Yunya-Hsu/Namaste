'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  orders.init({
    user_id: DataTypes.BIGINT,
    studio_id: DataTypes.BIGINT,
    date: DataTypes.DATE,
    total: DataTypes.MEDIUMINT,
    status: DataTypes.TINYINT,
    tappay_trade_id: DataTypes.STRING,
    point: DataTypes.MEDIUMINT,
    expire_date: DataTypes.DATE,
    remaining_point: DataTypes.MEDIUMINT
  }, {
    sequelize,
    modelName: 'orders'
  })
  return orders
}

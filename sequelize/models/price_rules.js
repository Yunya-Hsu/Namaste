'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class price_rules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  price_rules.init({
    studio_id: DataTypes.BIGINT,
    category: DataTypes.STRING,
    price: DataTypes.MEDIUMINT,
    point: DataTypes.SMALLINT,
    remark: DataTypes.STRING,
    term: DataTypes.MEDIUMINT,
    is_published: DataTypes.BOOLEAN,
    publish_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'price_rules'
  })
  return price_rules
}

'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class courses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  courses.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    teacher_id: DataTypes.BIGINT,
    studio_id: DataTypes.BIGINT,
    user_id: DataTypes.BIGINT,
    point: DataTypes.TINYINT,
    is_published: DataTypes.BOOLEAN,
    publish_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'courses'
  })
  return courses
}

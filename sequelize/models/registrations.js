'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class registrations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  registrations.init({
    course_detail_id: DataTypes.BIGINT,
    user_id: DataTypes.BIGINT,
    studio_name: DataTypes.STRING,
    course_title: DataTypes.STRING,
    teacher_name: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    start_time: DataTypes.TIME,
    duration: DataTypes.TINYINT,
    point: DataTypes.TINYINT,
    is_online: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'registrations'
  })
  return registrations
}

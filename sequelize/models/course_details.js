'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class course_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  course_details.init({
    course_id: DataTypes.BIGINT,
    date: DataTypes.DATEONLY,
    start_time: DataTypes.TIME,
    duration: DataTypes.TINYINT,
    is_online: DataTypes.BOOLEAN,
    limitation: DataTypes.TINYINT,
    online_limitation: DataTypes.TINYINT,
    is_published: DataTypes.BOOLEAN,
    publish_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'course_details'
  })
  return course_details
}

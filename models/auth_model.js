/* eslint-disable no-unused-vars */
const db = require('../config/mysql')

// basic parameter
const PERMISSION = {
  CREATE_STUDIOS: 1,
  DELETE_STUDIOS: 2,
  UPDATE_STUDIOS: 3,
  UPDATE_DEDICATED_STUDIO: 4,
  CREATE_STUDIO_PRICE_RULES: 5,
  UPDATE_STUDIO_PRICE_RULES: 6,
  DELETE_STUDIO_PRICE_RULES: 7,
  CREATE_STUDIO_TEACHER: 8,
  UPDATE_STUDIO_TEACHER: 9,
  DELETE_STUDIO_TEACHER: 10,
  CREATE_STUDIO_COURSE: 11,
  UPDATE_STUDIO_COURSE: 12,
  DELETE_STUDIO_COURSE: 13
}

const getUserRoles = async userId => {
  try {
    const [result] = await db.execute(
      'SELECT user_studio_role.user_id, user_studio_role.studio_id, user_studio_role.role_id, role_permissions.permission_id FROM user_studio_role LEFT JOIN role_permissions ON user_studio_role.role_id = role_permissions.role_id WHERE user_id = (?)',
      [userId]
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}


const validateLivestream = async roleId => {
  try {
    const [[result]] = await db.execute(
      'SELECT id FROM role_permissions WHERE role_id = (?) AND permission_id = 3',
      [roleId]
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}


module.exports = {
  PERMISSION,
  getUserRoles,
  validateLivestream
}

const db = require('../config/mysql')

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

const validateCrudStudios = async roleId => {
  try {
    const [[result]] = await db.execute(
      'SELECT id FROM role_permissions WHERE role_id = (?) AND permission_id = 1',
      [roleId]
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const validateCRUDStudioPrice = async (studioSubdomain, userId) => {
  try {
    const [[result]] = await db.execute(
      'SELECT id, name, logo FROM studios WHERE subdomain = (?) AND manager = (?)',
      [studioSubdomain, userId]
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  validateLivestream,
  validateCrudStudios,
  validateCRUDStudioPrice
}

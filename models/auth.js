const db = require('../config/mysql')

const validateLivestream = async roleId => {
  const [[result]] = await db.execute(
    'SELECT id FROM role_permissions WHERE role_id = (?) AND permission_id = 3',
    [roleId]
  )
  return result
}

const validateCrudStudios = async roleId => {
  const [[result]] = await db.execute(
    'SELECT id FROM role_permissions WHERE role_id = (?) AND permission_id = 1',
    [roleId]
  )
  return result
}

module.exports = {
  validateLivestream,
  validateCrudStudios
}

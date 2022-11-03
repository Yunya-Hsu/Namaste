const db = require('../config/mysql')

const getStudioBySubdomain = async subdomain => {
  const [[result]] = await db.execute('SELECT * FROM studios WHERE subdomain = (?)', [subdomain])
  return result
}

const checkRegistration = async (userId, courseDetailId) => {
  const [[result]] = await db.execute(
    'SELECT * FROM registration WHERE user_id = (?) AND course_detail_id = (?)',
    [userId, courseDetailId]
  )
  return result
}


module.exports = {
  getStudioBySubdomain,
  checkRegistration
}

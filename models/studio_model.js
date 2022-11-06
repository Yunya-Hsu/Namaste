const db = require('../config/mysql')

const verifyRegistration = async (userId, courseDetailId) => {
  const [[result]] = await db.execute(
    'SELECT id, course_title FROM registrations WHERE user_id = (?) AND course_detail_id = (?)',
    [userId, courseDetailId]
  )
  return result
}

const getStudioBySubdomain = async subdomain => {
  const [[result]] = await db.execute(
    'SELECT id FROM studios WHERE subdomain = (?)',
    [subdomain]
  )
  return result
}



module.exports = {
  getStudioBySubdomain,
  verifyRegistration
}

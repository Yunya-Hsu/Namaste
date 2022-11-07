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
    'SELECT id, name, logo, subdomain FROM studios WHERE subdomain = (?)',
    [subdomain]
  )
  return result
}

const getPriceRules = async (studioId, publishAt) => {
  try {
    const [result] = await db.execute(
      'SELECT id, category, price, point, remark, term FROM price_rules WHERE studio_id = (?) AND publish_at < (?);',
      [studioId, publishAt]
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}


module.exports = {
  getStudioBySubdomain,
  verifyRegistration,
  getPriceRules
}

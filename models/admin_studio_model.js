const db = require('../config/mysql')

const getCourseDetail = async (studioSubdomain, courseDetailId) => {
  try {
    const [[studio]] = await db.execute(
      'SELECT id FROM studios WHERE subdomain = (?)',
      [studioSubdomain]
    )

    const [[result]] = await db.execute(
      'SELECT * FROM course_details LEFT JOIN courses ON courses.id = course_details.course_id WHERE courses.studio_id = (?) AND course_details.id = (?)',
      [studio.id, courseDetailId]
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getLivestreamStudents = async courseDetailId => {
  try {
    const [result] = await db.execute(
      'SELECT registrations.user_id, users.name FROM registrations LEFT JOIN users ON registrations.user_id = users.id WHERE course_detail_id = (?);',
      [courseDetailId]
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

const getPriceRules = async studioId => {
  try {
    const [[result]] = await db.execute(
      'SELECT * FROM price_rules WHERE studio_id = (?)',
      [studioId]
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const createPriceRule = async (studioId, category, price, point, remark, term, publishAt, createdAt, updatedAt) => {
  try {
    const [result] = await db.execute(
      'INSERT INTO price_rules (studio_id, category, price, point, remark, term, publish_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);',
      [studioId, category, price, point, remark, term, publishAt, createdAt, updatedAt]
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  getCourseDetail,
  getLivestreamStudents,
  validateCRUDStudioPrice,
  getPriceRules,
  createPriceRule
}

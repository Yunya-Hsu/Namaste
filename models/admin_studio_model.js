const db = require('../config/mysql')

const getCourseDetail = async (studioSubdomain, courseDetailId) => {
  const [[studio]] = await db.execute(
    'SELECT id FROM studios WHERE subdomain = (?)',
    [studioSubdomain]
  )

  const [[result]] = await db.execute(
    'SELECT * FROM course_details LEFT JOIN courses ON courses.id = course_details.course_id WHERE courses.studio_id = (?) AND course_details.id = (?)',
    [studio.id, courseDetailId]
  )
  return result
}

const getLivestreamStudents = async courseDetailId => {
  const [result] = await db.execute(
    'SELECT user_id FROM registrations WHERE course_detail_id = (?)',
    [courseDetailId]
  )
  return result
}

module.exports = {
  getCourseDetail,
  getLivestreamStudents
}

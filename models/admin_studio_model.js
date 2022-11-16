/* eslint-disable camelcase */
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




// price_rules related
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

const getDedicatedPriceRule = async (studioId, priceRuleId) => {
  try {
    const [[result]] = await db.execute(
      'SELECT * FROM price_rules WHERE studio_id = (?) AND id = (?)',
      [studioId, priceRuleId]
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const updatePriceRule = async (id, category, price, point, remark, term, publish_at, updated_at) => {
  try {
    await db.execute(
      'UPDATE price_rules SET category = (?), price = (?), point = (?), remark = (?), term = (?), publish_at = (?), updated_at = (?) WHERE id = (?)',
      [category, price, point, remark, term, publish_at, updated_at, id]
    )
  } catch (error) {
    throw new Error(error)
  }
}

const getPriceRules = async studioId => {
  try {
    const [result] = await db.execute(
      'SELECT * FROM price_rules WHERE studio_id = (?)',
      [studioId]
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}
// price_rules related








// course related
const getStudioTeachers = async studioId => {
  try {
    const [result] = await db.execute(
      'SELECT id, name, major FROM teachers WHERE studio_id = (?);',
      [studioId]
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const validateStudioTeacher = async (teacherId, studioId) => {
  try {
    const [result] = await db.execute(
      'SELECT id FROM teachers WHERE id = (?) AND studio_id = (?);',
      [teacherId, studioId]
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const validateLivestreamAccount = async userEmail => {
  try {
    const [[result]] = await db.execute(
      'SELECT id FROM users WHERE email = (?);',
      [userEmail]
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const createCourse = async (title, description, teacher_id, studio_id, user_id, point, currentTime) => {
  try {
    const [result] = await db.execute(
      'INSERT INTO courses (title, description, teacher_id, studio_id, user_id, point, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
      [title, description, teacher_id, studio_id, user_id, point, currentTime, currentTime]
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getDedicatedCourse = async (studioId, courseId) => {
  try {
    const [[result]] = await db.execute(
      'SELECT courses.*, users.email FROM courses LEFT JOIN users ON courses.user_id = users.id WHERE courses.studio_id = (?) AND courses.id = (?)',
      [studioId, courseId]
    )

    return result
  } catch (error) {
    throw new Error(error)
  }
}

const updateCourse = async (courseId, title, description, teacher_id, user_id, point, updated_at) => {
  try {
    await db.execute(
      'UPDATE courses SET title = (?), description = (?), teacher_id = (?), user_id = (?), point = (?), updated_at = (?) WHERE id = (?)',
      [title, description, teacher_id, user_id, point, updated_at, courseId]
    )
  } catch (error) {
    throw new Error(error)
  }
}

const getStudioCourses = async studioId => {
  try {
    const [result] = await db.execute(
      'SELECT courses.*, teachers.name AS teacher, users.email FROM courses LEFT JOIN teachers ON courses.teacher_id = teachers.id LEFT JOIN users ON courses.user_id = users.id WHERE courses.studio_id = (?);',
      [studioId]
    )

    return result
  } catch (error) {
    throw new Error(error)
  }
}
// course related










// course_detail related
// 檢查 course_id 是否隸屬該教室
const getCourseById = async (courseId, studioId) => {
  try {
    const [[result]] = await db.execute(
      'SELECT id FROM courses WHERE id = (?) AND studio_id = (?);',
      [courseId, studioId]
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const createCourseDetail = async (courseId, date, startTime, duration, isOnline, limitation, onlineLimitation, publishAt, currentTime) => {
  try {
    const [result] = await db.execute(
      'INSERT INTO course_details (course_id, date, start_time, duration, is_online, limitation, online_limitation, publish_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
      [courseId, date, startTime, duration, isOnline, limitation, onlineLimitation, publishAt, currentTime, currentTime]
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getDedicatedCourseDetail = async (studioId, courseDetailId) => {
  try {
    const [[result]] = await db.execute(
      'SELECT course_details.*, courses.studio_id, courses.title FROM course_details LEFT JOIN courses ON courses.id = course_details.course_id WHERE courses.studio_id = (?) AND course_details.id = (?);',
      [studioId, courseDetailId]
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const updateCourseDetail = async (courseDetailId, date, start_time, duration, is_online, limitation, online_limitation, publish_at, updated_at) => {
  try {
    await db.execute(
      'UPDATE course_details SET date = (?), start_time = (?), duration = (?), is_online = (?), limitation = (?), online_limitation = (?), publish_at = (?), updated_at = (?) WHERE id = (?);',
      [date, start_time, duration, is_online, limitation, online_limitation, publish_at, updated_at, courseDetailId]
    )
  } catch (error) {
    throw new Error(error)
  }
}

const getStudioCourseDetail = async studioId => {
  try {
    const [result] = await db.execute(
      'SELECT course_details.*, courses.title FROM course_details LEFT JOIN courses ON courses.id = course_details.course_id WHERE courses.studio_id = ? ORDER BY course_details.date DESC',
      [studioId]
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}
// course_detail related






module.exports = {
  getCourseDetail,

  getLivestreamStudents,

  createPriceRule,
  getDedicatedPriceRule,
  updatePriceRule,
  getPriceRules,

  getStudioTeachers,
  validateStudioTeacher,
  validateLivestreamAccount,
  createCourse,
  getDedicatedCourse,
  updateCourse,
  getStudioCourses,

  getCourseById,
  createCourseDetail,
  getDedicatedCourseDetail,
  updateCourseDetail,
  getStudioCourseDetail
}

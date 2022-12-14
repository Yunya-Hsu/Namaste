/* eslint-disable camelcase */
const db = require('../config/mysql')

const getThisWeekOnlineCourses = async (studioId, thisMonday, thisSunday, today) => {
  try {
    const [result] = await db.execute(
      'SELECT course_details.id, course_details.date, course_details.start_time, course_details.duration, course_details.is_oneOnOne, courses.title, courses.studio_id FROM course_details LEFT JOIN courses on courses.id = course_details.course_id WHERE courses.studio_id = (?) AND course_details.is_online = 1 AND course_details.date BETWEEN (?) AND (?) AND course_details.publish_at < (?) ORDER BY course_details.date DESC, course_details.start_time DESC;',
      [studioId, thisMonday, thisSunday, today]
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getMonthlyProfit = async (studioId, startOfMonth, endOfMonth) => {
  try {
    const [[result]] = await db.execute(
      'SELECT SUM(total) AS monthlyProfit FROM orders WHERE studio_id = (?) AND date BETWEEN (?) AND (?);',
      [studioId, startOfMonth, endOfMonth]
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getMonthlyProfitGroupByRules = async (studioId, startOfMonth, endOfMonth) => {
  try {
    const [result] = await db.execute(
      'SELECT COUNT(id) AS order_qty, SUM(total) AS total, total AS category FROM orders WHERE studio_id = (?) AND date BETWEEN (?) AND (?) GROUP BY total;',
      [studioId, startOfMonth, endOfMonth]
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

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
// ?????? course_id ?????????????????????
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

const createCourseDetail = async (courseId, date, startTime, duration, isOnline, limitation, onlineLimitation, isOneOnOne, publishAt, currentTime) => {
  try {
    const [result] = await db.execute(
      'INSERT INTO course_details (course_id, date, start_time, duration, is_online, limitation, online_limitation, is_oneOnOne, publish_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
      [courseId, date, startTime, duration, isOnline, limitation, onlineLimitation, isOneOnOne, publishAt, currentTime, currentTime]
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

const updateCourseDetail = async (courseDetailId, date, start_time, duration, is_online, limitation, online_limitation, isOneOnOne, publish_at, updated_at) => {
  try {
    await db.execute(
      'UPDATE course_details SET date = (?), start_time = (?), duration = (?), is_online = (?), limitation = (?), online_limitation = (?), is_oneOnOne = (?), publish_at = (?), updated_at = (?) WHERE id = (?);',
      [date, start_time, duration, is_online, limitation, online_limitation, isOneOnOne, publish_at, updated_at, courseDetailId]
    )
  } catch (error) {
    throw new Error(error)
  }
}

const getStudioCourseDetail = async studioId => {
  try {
    const [result] = await db.execute(
      'SELECT course_details.*, courses.title FROM course_details LEFT JOIN courses ON courses.id = course_details.course_id WHERE courses.studio_id = ? ORDER BY course_details.date DESC, course_details.start_time DESC',
      [studioId]
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}
// course_detail related








// teacher related
const createTeacher = async (name, avatar, major, introduction, studio_id, currentTime) => {
  try {
    const [result] = await db.execute(
      'INSERT INTO teachers (name, avatar, major, introduction, studio_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, avatar, major, introduction, studio_id, currentTime, currentTime]
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getDedicatedTeacher = async (studioId, teacherId) => {
  try {
    const [[result]] = await db.execute(
      'SELECT * FROM teachers WHERE studio_id = (?) AND id = (?);',
      [studioId, teacherId]
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const updateTeacherWithAvatar = async (teacherId, name, avatar, major, introduction, updated_at) => {
  try {
    await db.execute(
      'UPDATE teachers SET name = (?), avatar = (?), major = (?), introduction = (?), updated_at = (?) WHERE id = (?);',
      [name, avatar, major, introduction, updated_at, teacherId]
    )
  } catch (error) {
    throw new Error(error)
  }
}

const updateTeacherWithoutAvatar = async (teacherId, name, major, introduction, updated_at) => {
  try {
    await db.execute(
      'UPDATE teachers SET name = (?), major = (?), introduction = (?), updated_at = (?) WHERE id = (?);',
      [name, major, introduction, updated_at, teacherId]
    )
  } catch (error) {
    throw new Error(error)
  }
}
// teacher related





// about related
const updateStudio = async (studioId, name, logo, introduction_title, introduction_detail, introduction_photo, address, address_description, phone, tappay_app_key, tappay_partner_key, tappay_id, tappay_app_id, updated_at) => {
  try {
    await db.execute(
      'UPDATE studios SET name = (?), logo = (?), introduction_title = (?), introduction_detail = (?), introduction_photo = (?), address = (?), address_description = (?), phone = (?), tappay_app_key = (?), tappay_partner_key = (?), tappay_id = (?), tappay_app_id = (?), updated_at = (?) WHERE id = (?);',
      [name, logo, introduction_title, introduction_detail, introduction_photo, address, address_description, phone, tappay_app_key, tappay_partner_key, tappay_id, tappay_app_id, updated_at, studioId]
    )
  } catch (error) {
    throw new Error(error)
  }
}
// about related



module.exports = {
  getThisWeekOnlineCourses,
  getMonthlyProfit,
  getMonthlyProfitGroupByRules,

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
  getStudioCourseDetail,

  createTeacher,
  getDedicatedTeacher,
  updateTeacherWithAvatar,
  updateTeacherWithoutAvatar,

  updateStudio
}

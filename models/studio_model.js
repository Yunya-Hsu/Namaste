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

const getStudioForHomePage = async subdomain => {
  try {
    const [[result]] = await db.execute(
      'SELECT id, name, logo, introduction_title, introduction_detail, introduction_photo, subdomain FROM studios WHERE subdomain = (?)',
      [subdomain]
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getStudioForAbout = async subdomain => {
  try {
    const [[result]] = await db.execute(
      'SELECT * FROM studios WHERE subdomain = (?)',
      [subdomain]
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getTeachers = async studioId => {
  try {
    const [result] = await db.execute(
      'SELECT * FROM teachers WHERE studio_id = (?)',
      [studioId]
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
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

const getStudioForCheckout = async subdomain => {
  const [[result]] = await db.execute(
    'SELECT id, name, logo, subdomain, tappay_app_key, tappay_partner_key, tappay_id, tappay_app_id FROM studios WHERE subdomain = (?)',
    [subdomain]
  )
  return result
}

const getDedicatedPriceRule = async (priceRuleId, publishAt, studioId) => {
  try {
    const [[result]] = await db.execute(
      'SELECT * FROM price_rules WHERE id = (?) AND publish_at < (?) AND studio_id = (?);',
      [priceRuleId, publishAt, studioId]
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const createOrder = async (userId, studioId, currentTime, total, point, expireDate) => {
  try {
    const [result] = await db.execute(
      'INSERT INTO orders (user_id, studio_id, date, total, point, expire_date, remaining_point, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);',
      [userId, studioId, currentTime, total, point, expireDate, point, currentTime, currentTime]
    )
    return result.insertId
  } catch (error) {
    throw new Error(error)
  }
}

const updateOrderStatus = async (orderId, tappayTradeId) => {
  try {
    const [result] = await db.execute(
      'UPDATE orders SET status = 1, tappay_trade_id = (?) WHERE id = (?)',
      [tappayTradeId, orderId]
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getCourseDetails = async (studioId, startDate, EndDate, currentTime) => {
  try {
    const [result] = await db.execute(
      'SELECT course_details.id AS id, courses.title, courses.point, course_details.date, course_details.start_time, course_details.duration, course_details.is_online, course_details.limitation, course_details.online_limitation, teachers.name FROM course_details LEFT JOIN courses ON courses.id = course_details.course_id LEFT JOIN teachers ON teachers.id = courses.teacher_id WHERE courses.studio_id = (?) AND course_details.date BETWEEN (?) AND (?) AND course_details.publish_at < (?) ORDER BY course_details.start_time;',
      [studioId, startDate, EndDate, currentTime]
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getRegistration = async (userId, courseDetailId) => {
  try {
    const [[result]] = await db.execute(
      'SELECT id FROM registrations WHERE user_id = (?) AND course_detail_id = (?);',
      [userId, courseDetailId]
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getDedicatedCourseDetail = async courseDetailId => {
  try {
    const [[courseDetail]] = await db.execute(
      'SELECT course_details.id, course_details.date, course_details.start_time, course_details.duration, course_details.is_online, course_details.limitation, course_details.online_limitation, courses.studio_id, courses.title, courses.point, studios.name AS studio_name, studios.subdomain AS studio_subdomain, teachers.name AS teacher_name FROM course_details LEFT JOIN courses ON courses.id = course_details.course_id LEFT JOIN studios ON studios.id = courses.studio_id LEFT JOIN teachers ON teachers.id = courses.teacher_id WHERE course_details.id = (?)',
      [courseDetailId]
    )
    return courseDetail
  } catch (error) {
    throw new Error(error)
  }
}

const getUserOrder = async (userId, studioId, currentTime) => {
  try {
    const [userOrder] = await db.execute(
      'SELECT id, remaining_point FROM orders WHERE user_id = (?) AND studio_id = (?) AND remaining_point > 0 AND expire_date > (?) ORDER BY expire_date',
      [userId, studioId, currentTime]
    )
    return userOrder
  } catch (error) {
    throw new Error(error)
  }
}

const registerCourse = async (courseDetail, isBookOnlineCourse, requiredOrderList, deductionList, userId, currentTime) => {
  const conn = await db.getConnection()
  try {
    await conn.beginTransaction()

    // 到 course_detail 更新剩餘空位
    if (isBookOnlineCourse === 1) {
      await conn.execute(
        'UPDATE course_details SET online_limitation = online_limitation - 1 WHERE id = (?)',
        [courseDetail.id]
      )
    }
    if (isBookOnlineCourse === 0) {
      await conn.execute(
        'UPDATE course_details SET limitation = limitation - 1 WHERE id = (?)',
        [courseDetail.id]
      )
    }

    // 到 registration 新增一筆紀錄
    const [registration] = await conn.execute(
      'INSERT INTO registrations (course_detail_id, user_id, studio_name, course_title, teacher_name, date, start_time, duration, point, is_online, created_at, updated_at, studio_subdomain) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
      [courseDetail.id, userId, courseDetail.studio_name, courseDetail.title, courseDetail.teacher_name, courseDetail.date, courseDetail.start_time, courseDetail.duration, courseDetail.point, isBookOnlineCourse, currentTime, currentTime, courseDetail.studio_subdomain]
    )

    // 到 order 扣除、到 registration_order 新增扣除紀錄
    for (let i = 0; i < requiredOrderList.length; i++) {
      await conn.execute(
        'UPDATE orders SET remaining_point = remaining_point - (?), updated_at = (?) WHERE id = (?)',
        [Number(deductionList[i]), currentTime, Number(requiredOrderList[i])]
      )
      await conn.execute(
        'INSERT INTO registration_order (registration_id, order_id, consume_point, created_at, updated_at) VALUES (?, ?, ?, ?, ?);',
        [registration.insertId, Number(requiredOrderList[i]), Number(deductionList[i]), currentTime, currentTime]
      )
    }

    await conn.commit()
    return registration.insertId
  } catch (error) {
    await conn.rollback()
    throw new Error(error)
  } finally {
    await conn.release()
  }
}

const getRegisterDetail = async registrationId => {
  try {
    const [[result]] = await db.execute(
      'SELECT * FROM registrations WHERE id = (?);',
      [registrationId]
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getRegisterAndOrderRelationship = async registrationId => {
  try {
    const [result] = await db.execute(
      'SELECT * FROM registration_order WHERE registration_id = (?);',
      [registrationId]
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const deregisterCourse = async (registrationId, registerDetail, registerAndOrderList, currentTime) => {
  const conn = await db.getConnection()
  try {
    await conn.beginTransaction()

    // 到 course_detail 更新剩餘空位
    if (registerDetail.is_online === 0) {
      await conn.execute(
        'UPDATE course_details SET limitation = limitation + 1 WHERE id = (?);',
        [registerDetail.course_detail_id]
      )
    }
    if (registerDetail.is_online === 1) {
      await conn.execute(
        'UPDATE course_details SET online_limitation = online_limitation + 1 WHERE id = (?);',
        [registerDetail.course_detail_id]
      )
    }

    // 到 order 把點數加回、到 registration_order 刪除紀錄
    for (let i = 0; i < registerAndOrderList.length; i++) {
      await conn.execute(
        'UPDATE orders SET remaining_point = remaining_point + (?), updated_at = (?) WHERE id = (?)',
        [Number(registerAndOrderList[i].consume_point), currentTime, Number(registerAndOrderList[i].order_id)]
      )
      await conn.execute(
        'DELETE FROM registration_order WHERE id = (?);',
        [Number(registerAndOrderList[i].id)]
      )
    }

    // 到 registration 刪除該紀錄
    await conn.execute(
      'DELETE FROM registrations WHERE id = (?);',
      [registrationId]
    )

    await conn.commit()
  } catch (error) {
    await conn.rollback()
    throw new Error(error)
  } finally {
    await conn.release()
  }
}


module.exports = {
  getStudioBySubdomain,
  getStudioForHomePage,
  getStudioForAbout,
  getTeachers,
  getStudioForCheckout,
  getPriceRules,
  verifyRegistration,
  getDedicatedPriceRule,
  createOrder,
  updateOrderStatus,
  getCourseDetails,
  getRegistration,
  getDedicatedCourseDetail,
  getUserOrder,
  registerCourse,
  getRegisterDetail,
  getRegisterAndOrderRelationship,
  deregisterCourse
}

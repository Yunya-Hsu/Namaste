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

module.exports = {
  getStudioBySubdomain,
  verifyRegistration,
  getPriceRules,
  getStudioForCheckout,
  getDedicatedPriceRule,
  createOrder,
  updateOrderStatus
}

/* eslint-disable camelcase */
const db = require('../config/mysql')


const findUserByEmail = async email => {
  try {
    const [[userId]] = await db.execute(
      'SELECT id, email, password FROM users WHERE email = (?)',
      [email]
    )
    return userId
  } catch (error) {
    throw new Error(error)
  }
}

const createUser = async (name, email, password, created_at, updated_at) => {
  try {
    const [insertData] = await db.execute(
      'INSERT INTO users (role_id, name, email, password, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
      [3, name, email, password, created_at, updated_at]
    )
    return insertData.insertId
  } catch (error) {
    throw new Error(error)
  }
}

const deserializeUserInfo = async id => {
  const [[user]] = await db.execute(
    'SELECT users.id, users.name, users.email, studios.id AS studioId, studios.subdomain FROM users LEFT JOIN studios ON users.id = studios.manager WHERE users.id = (?) ORDER BY studios.id DESC LIMIT 1',
    [id]
  )
  delete user.studioId
  return user
}

const getOrders = async userId => {
  try {
    const [result] = await db.execute(
      'SELECT orders.id, orders.studio_id, studios.name AS studio_name, studios.subdomain, orders.date, orders.total, orders.status, orders.point, orders.expire_date, orders.remaining_point FROM orders LEFT JOIN studios ON studios.id = orders.studio_id WHERE user_id = (?) ORDER BY orders.expire_date DESC;',
      [userId]
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getRegistration = async userId => {
  try {
    const [result] = await db.execute(
      'SELECT * FROM registrations WHERE user_id = (?) ORDER BY date DESC;',
      [userId]
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  findUserByEmail,
  createUser,
  deserializeUserInfo,
  getOrders,
  getRegistration
}

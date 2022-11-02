/* eslint-disable camelcase */
const db = require('../config/mysql')


const findUserByEmail = async email => {
  const [[userId]] = await db.execute(
    'SELECT id, email, password, role_id FROM users WHERE email = (?)',
    [email]
  )
  return userId
}

const createUser = async (name, email, password, created_at, updated_at) => {
  const [insertData] = await db.execute(
    'INSERT INTO users (role_id, name, email, password, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
    [3, name, email, password, created_at, updated_at]
  )
  return insertData.insertId
}

const deserializeUserInfo = async id => {
  const [[user]] = await db.execute(
    'SELECT users.id, users.role_id, users.name, users.email, studios.id AS studioId, studios.subdomain FROM users LEFT JOIN studios ON users.id = studios.manager WHERE users.id = (?) ORDER BY studios.id DESC LIMIT 1',
    [id]
  )
  delete user.studioId
  return user
}

module.exports = {
  findUserByEmail,
  createUser,
  deserializeUserInfo
}

/* eslint-disable camelcase */

const db = require('../config/mysql')

const checkSubdomain = async subdomain => {
  const [result] = await db.execute('SELECT id FROM studios WHERE subdomain = (?)', [subdomain])
  return result
}

const findRoleIdByEmail = async email => {
  const [[result]] = await db.execute('SELECT role_id FROM users WHERE email = (?)', [email])
  return result && result.role_id ? result.role_id : null
}


const createStudio = async (name, introduction_title, introduction_detail, subdomain, managerRoleId, address, address_description, phone, tappay_app_key, tappay_partner_key, tappay_id, logo, introduction_photo, created_at, updated_at) => {
  const [insertData] = await db.execute(
    'INSERT INTO studios (name, introduction_title, introduction_detail, subdomain, manager, address, address_description, phone, tappay_app_key, tappay_partner_key, tappay_id, logo, introduction_photo, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [name, introduction_title, introduction_detail, subdomain, managerRoleId, address, address_description, phone, tappay_app_key, tappay_partner_key, tappay_id, logo, introduction_photo, created_at, updated_at]
  )
  return insertData.insertId
}

module.exports = {
  checkSubdomain,
  findRoleIdByEmail,
  createStudio
}

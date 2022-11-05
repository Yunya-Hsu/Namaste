/* eslint-disable camelcase */

const db = require('../config/mysql')

const checkSubdomain = async subdomain => {
  try {
    const [result] = await db.execute('SELECT id FROM studios WHERE subdomain = (?)', [subdomain])
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const findRoleIdByEmail = async email => {
  try {
    const [[result]] = await db.execute('SELECT role_id FROM users WHERE email = (?)', [email])
    return result && result.role_id ? result.role_id : null
  } catch (error) {
    throw new Error(error)
  }
}


const createStudio = async (name, introduction_title, introduction_detail, subdomain, managerRoleId, address, address_description, phone, tappay_app_key, tappay_partner_key, tappay_id, logo, introduction_photo, created_at, updated_at) => {
  try {
    const [insertData] = await db.execute(
      'INSERT INTO studios (name, introduction_title, introduction_detail, subdomain, manager, address, address_description, phone, tappay_app_key, tappay_partner_key, tappay_id, logo, introduction_photo, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, introduction_title, introduction_detail, subdomain, managerRoleId, address, address_description, phone, tappay_app_key, tappay_partner_key, tappay_id, logo, introduction_photo, created_at, updated_at]
    )
    return insertData.insertId
  } catch (error) {
    throw new Error(error)
  }
}


module.exports = {
  checkSubdomain,
  findRoleIdByEmail,
  createStudio
}

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



const createStudio = async (name, introduction_title, introduction_detail, subdomain, managerId, address, address_description, phone, tappay_app_key, tappay_partner_key, tappay_id, tappay_app_id, logo, introduction_photo, created_at, updated_at) => {
  const conn = await db.getConnection()
  try {
    await conn.beginTransaction()
    // create studio
    const [insertData] = await conn.execute(
      'INSERT INTO studios (name, introduction_title, introduction_detail, subdomain, manager, address, address_description, phone, tappay_app_key, tappay_partner_key, tappay_id, tappay_app_id, logo, introduction_photo, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, introduction_title, introduction_detail, subdomain, managerId, address, address_description, phone, tappay_app_key, tappay_partner_key, tappay_id, tappay_app_id, logo, introduction_photo, created_at, updated_at]
    )

    // update studio owner's permission
    await conn.execute(
      'INSERT INTO user_studio_role (user_id, studio_id, role_id, created_at, updated_at) VALUES (?, ?, 2, ?, ?)', // TODO: check??
      [managerId, insertData.insertId, created_at, updated_at]
    )

    await conn.commit()
    return insertData.insertId
  } catch (error) {
    await conn.rollback()
    throw new Error(error)
  } finally {
    conn.release()
  }
}


module.exports = {
  checkSubdomain,
  createStudio
}

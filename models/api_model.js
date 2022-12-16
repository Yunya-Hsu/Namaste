const db = require('../config/mysql')

const search = async (keyword, table, column) => {
  try {
    const [result] = await db.query(
      'SELECT id, name, logo, introduction_title, introduction_detail, introduction_photo, subdomain, address FROM ?? WHERE MATCH (??) AGAINST(?);',
      [table, [column], keyword]
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  search
}

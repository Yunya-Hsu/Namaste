const db = require('../config/mysql')

const clearTable = async () => {
  await db.query('drop table course_details, courses, orders, permissions, price_rules, registration_order, registrations, role_permissions, roles, studios, teachers, users, user_studio_role, SequelizeMeta')
}

clearTable()
  .then(() => {
    console.log('drop tables done')
  })
  .catch(err => {
    console.log(err)
  })
  .finally(() => {
    process.exit()
  })
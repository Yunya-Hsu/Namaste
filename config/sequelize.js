const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

module.exports = {
  "development": {
    "host": process.env.DB_DEV_HOST,
    "username": process.env.DB_DEV_USER,
    "password": process.env.DB_DEV_PASSWORD,
    "database": process.env.DB_DEV_DATABASENAME,
    "dialect": "mysql"
  },
  "production": {
    "host": process.env.DB_PROD_HOST,
    "username": process.env.DB_PROD_USER,
    "password": process.env.DB_PROD_PASSWORD,
    "database": process.env.DB_PROD_DATABASENAME,
    "dialect": "mysql"
  }
}

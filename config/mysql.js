const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const mysql = require('mysql2')
const env = process.env.NODE_ENV

const mysqlConfig = {
  development: {
    host: process.env.DB_DEV_HOST,
    user: process.env.DB_DEV_USER,
    password: process.env.DB_DEV_PASSWORD,
    database: process.env.DB_DEV_DATABASENAME
  },
  production: {
    host: process.env.DB_PROD_HOST,
    user: process.env.DB_PROD_USER,
    password: process.env.DB_PROD_PASSWORD,
    database: process.env.DB_PROD_DATABASENAME
  },
  test: {
    host: process.env.DB_TEST_HOST,
    user: process.env.DB_TEST_USER,
    password: process.env.DB_TEST_PASSWORD,
    database: process.env.DB_TEST_DATABASENAME
  }
}

const mysqlEnv = mysqlConfig[env]
mysqlEnv.waitForConnections = true
mysqlEnv.connectionLimit = 10
mysqlEnv.queueLimit = 0
mysqlEnv.dateStrings = true

const db = mysql.createPool(mysqlEnv)
module.exports = db.promise()

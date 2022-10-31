const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const mysql = require('mysql2')
const env = process.env.NODE_ENV

const mysqlConfig = {
  development: {
    host: process.env.DB_DEV_HOST,
    user: process.env.DB_DEV_USER,
    password: process.env.DB_DEV_PASSWORD,
    database: process.env.DB_DEV_DATABASENAME,
  },
  production: {
    host: process.env.DB_PROD_HOST,
    user: process.env.DB_PROD_USER,
    password: process.env.DB_PROD_PASSWORD,
    database: process.env.DB_PROD_DATABASENAME,
  }
}

mysqlEnv = mysqlConfig[env]
mysqlEnv.waitForConnections = true
mysql.connectionLimit = 10
mysql.queueLimit = 0


const db = mysql.createPool(mysqlEnv)
module.exports = db.promise()

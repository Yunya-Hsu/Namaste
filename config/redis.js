const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const redis = require('redis')

const url = `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`

const redisClient = redis.createClient({url, legacyMode: false})
redisClient.connect()
const sessionClient = redis.createClient({url, legacyMode: true})
sessionClient.connect()

module.exports = {
  redisClient,
  sessionClient
}

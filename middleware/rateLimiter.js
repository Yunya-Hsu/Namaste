const { time, zAddRateLimiter } = require('../models/redis')

const timeWindowInSecond = 1
const timeWindowInMicroseconds = timeWindowInSecond * 1000000
const requestUpperLimit = 10

const rateLimiter = async (req, res, next) => {
  try {
    const currentTime = await time()
    const ip = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'] : req.ip

    const numberOfRequest = await zAddRateLimiter(ip, currentTime, timeWindowInMicroseconds, timeWindowInSecond)

    if (numberOfRequest > requestUpperLimit) {
      // console.debug(`來自 ${ip}的請求，時間${currentTime}，路由${req.url}，累計數量為${numberOfRequest}，拒絕!`)
      return res.status(429).json({ error: 'rate limit' })
    }

    // console.debug(`來自 ${ip}的請求，時間${currentTime}，路由${req.url}，累計數量為${numberOfRequest}`)
    return next()
  } catch (error) {
    console.error(error)
    next()
  }
}

module.exports = rateLimiter

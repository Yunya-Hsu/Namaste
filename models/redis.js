const { redisClient } = require('../config/redis')


const time = async () => {
  try {
    const time = await redisClient.sendCommand(['TIME'])
    return Number(time[0].toString() + time[1].toString().padStart(7, 0))
  } catch (err) {
    return err
  }
}

const zAddRateLimiter = async (ip, currentTime, timeWindowInMicroseconds, timeWindowInSecond) => {
  try {
    const numberOfRequest = await redisClient
      .multi()
      .zRemRangeByScore(`user:from:${ip}`, 0, (currentTime - timeWindowInMicroseconds)) // 找到 key，清空「相對於發出請求當下，已過期的時間戳記」
      .zAdd(`user:from:${ip}`, { score: currentTime, value: currentTime.toString() }) // 把發出請求的時間戳記寫進去
      .expire(`user:from:${ip}`, timeWindowInSecond)
      .zCount(`user:from:${ip}`, 0, currentTime) // 計算目前總共幾個，最低 1 個
      .exec()

    return numberOfRequest.pop()
  } catch (err) {
    return err
  }
}



module.exports = {
  time,
  zAddRateLimiter
}

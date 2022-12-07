const moment = require('moment-timezone')

const currentTime = () => {
  return moment().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')
}

module.exports = {
  currentTime
}

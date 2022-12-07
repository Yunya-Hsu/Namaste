const moment = require('moment-timezone')

const currentTime = () => {
  return moment().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')
}

const currentYear = () => {
  return moment().tz('Asia/Taipei').format('YYYY')
}

const currentWeek = () => {
  return moment().tz('Asia/Taipei').isoWeek()
}


const noonTime = () => {
  return moment('12:00', 'HH:mm')
}

const dinnerTime = () => {
  return moment('18:00', 'HH:mm')
}

const expireDate = (term) => {
  return moment().tz('Asia/Taipei').add(term, 'days').format('YYYY-MM-DD')
}

module.exports = {
  currentTime,
  currentYear,
  currentWeek,
  noonTime,
  dinnerTime,
  expireDate
}

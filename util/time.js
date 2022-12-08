const moment = require('moment-timezone')

const inputTimeReformat = (time) => {
  return moment(time).format('YYYY-MM-DD HH:mm:ss')
}

const timeFormatToHTML = (time) => {
  return moment(time).format('YYYY-MM-DD[T]HH:mm:ss')
}

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
  inputTimeReformat,
  timeFormatToHTML,
  currentTime,
  currentYear,
  currentWeek,
  noonTime,
  dinnerTime,
  expireDate
}

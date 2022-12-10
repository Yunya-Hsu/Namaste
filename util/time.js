const moment = require('moment-timezone')

// transform time
const inputTimeReformat = (time) => {
  return moment(time).format('YYYY-MM-DD HH:mm:ss')
}

const timeFormatToHTML = (time) => {
  return moment(time).format('YYYY-MM-DD[T]HH:mm:ss')
}


// get time
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



// calculate time
const expireDate = (term) => {
  return moment().tz('Asia/Taipei').add(term, 'days').format('YYYY-MM-DD')
}


// validate
const isISO8601 = (time) => {
  return moment(time).isValid()
}

const isDate = (date) => {
  return moment(date, 'YYYY-MM-DD', true).isValid()
}

const isTime = time => {
  return moment(time, 'HH:mm', true).isValid() || moment(time, 'HH:mm:ss', true).isValid()
}

module.exports = {
  inputTimeReformat,
  timeFormatToHTML,

  currentTime,
  currentYear,
  currentWeek,
  noonTime,
  dinnerTime,

  expireDate,

  isISO8601,
  isDate,
  isTime
}

const moment = require('moment-timezone')
const startDate = moment().add(7, 'days')

const thisMonday = moment(startDate).day('Monday').format('YYYY-MM-DD')
const thisTuesday = moment(startDate).day('Tuesday').format('YYYY-MM-DD')
const thisWednesday = moment(startDate).day('Wednesday').format('YYYY-MM-DD')
const thisThursday = moment(startDate).day('Thursday').format('YYYY-MM-DD')
const thisFriday = moment(startDate).day('Friday').format('YYYY-MM-DD')
const thisSaturday = moment(startDate).day('Saturday').format('YYYY-MM-DD')
const thisSunday = moment(startDate).day('Monday').add(6, 'days').format('YYYY-MM-DD')
const currentTime = moment().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')

const db = require('../config/mysql')

const SEED_COURSE_DETAIL = [
  // studio 1, total 26 course_detilas
  {
    course_id: 1,
    date: thisMonday,
    start_time: '9:00:00',
    duration: 60,
    is_online: 0,
    limitation: 18,
    online_limitation: 0
  },
  {
    course_id: 2,
    date: thisMonday,
    start_time: '11:00:00',
    duration: 60,
    is_online: 1,
    limitation: 0,
    online_limitation: 25
  },
  {
    course_id: 10,
    date: thisMonday,
    start_time: '14:00:00',
    duration: 60,
    is_online: 0,
    limitation: 15,
    online_limitation: 0
  },
  {
    course_id: 4,
    date: thisMonday,
    start_time: '16:00:00',
    duration: 60,
    is_online: 0,
    limitation: 12,
    online_limitation: 0
  },
  {
    course_id: 12,
    date: thisMonday,
    start_time: '19:00:00',
    duration: 60,
    is_online: 0,
    limitation: 14,
    online_limitation: 0
  },
  {
    course_id: 8,
    date: thisMonday,
    start_time: '21:00:00',
    duration: 60,
    is_online: 0,
    limitation: 15,
    online_limitation: 0
  },
  {
    course_id: 3,
    date: thisTuesday,
    start_time: '10:00:00',
    duration: 60,
    is_online: 0,
    limitation: 17,
    online_limitation: 0
  },
  {
    course_id: 14,
    date: thisTuesday,
    start_time: '15:00:00',
    duration: 60,
    is_online: 0,
    limitation: 20,
    online_limitation: 0
  },
  {
    course_id: 5,
    date: thisTuesday,
    start_time: '19:00:00',
    duration: 60,
    is_online: 0,
    limitation: 15,
    online_limitation: 0
  },
  {
    course_id: 1,
    date: thisWednesday,
    start_time: '10:00:00',
    duration: 60,
    is_online: 0,
    limitation: 15,
    online_limitation: 0
  },
  {
    course_id: 2,
    date: thisWednesday,
    start_time: '11:00:00',
    duration: 60,
    is_online: 1,
    limitation: 0,
    online_limitation: 25
  },
  {
    course_id: 11,
    date: thisWednesday,
    start_time: '20:00:00',
    duration: 60,
    is_online: 0,
    limitation: 16,
    online_limitation: 0
  },
  {
    course_id: 7,
    date: thisThursday,
    start_time: '09:00:00',
    duration: 60,
    is_online: 0,
    limitation: 18,
    online_limitation: 0
  },
  {
    course_id: 1,
    date: thisThursday,
    start_time: '10:00:00',
    duration: 60,
    is_online: 0,
    limitation: 12,
    online_limitation: 0
  },
  {
    course_id: 9,
    date: thisThursday,
    start_time: '16:00:00',
    duration: 60,
    is_online: 1,
    limitation: 0,
    online_limitation: 30
  },
  {
    course_id: 12,
    date: thisThursday,
    start_time: '19:00:00',
    duration: 60,
    is_online: 0,
    limitation: 13,
    online_limitation: 0
  },
  {
    course_id: 13,
    date: thisThursday,
    start_time: '21:00:00',
    duration: 60,
    is_online: 1,
    limitation: 20,
    online_limitation: 5
  },
  {
    course_id: 2,
    date: thisFriday,
    start_time: '09:00:00',
    duration: 60,
    is_online: 1,
    limitation: 18,
    online_limitation: 8
  },
  {
    course_id: 4,
    date: thisFriday,
    start_time: '14:00:00',
    duration: 60,
    is_online: 0,
    limitation: 18,
    online_limitation: 0
  },
  {
    course_id: 5,
    date: thisFriday,
    start_time: '20:00:00',
    duration: 60,
    is_online: 0,
    limitation: 13,
    online_limitation: 0
  },
  {
    course_id: 1,
    date: thisSaturday,
    start_time: '09:00:00',
    duration: 60,
    is_online: 0,
    limitation: 12,
    online_limitation: 0
  },
  {
    course_id: 6,
    date: thisSaturday,
    start_time: '16:00:00',
    duration: 60,
    is_online: 1,
    limitation: 16,
    online_limitation: 8
  },
  {
    course_id: 10,
    date: thisSaturday,
    start_time: '19:00:00',
    duration: 60,
    is_online: 0,
    limitation: 18,
    online_limitation: 0
  },
  {
    course_id: 9,
    date: thisSunday,
    start_time: '09:00:00',
    duration: 60,
    is_online: 1,
    limitation: 12,
    online_limitation: 8
  },
  {
    course_id: 14,
    date: thisSunday,
    start_time: '15:00:00',
    duration: 60,
    is_online: 0,
    limitation: 15,
    online_limitation: 0
  },
  {
    course_id: 13,
    date: thisSunday,
    start_time: '21:00:00',
    duration: 60,
    is_online: 1,
    limitation: 18,
    online_limitation: 12
  },





  // studio 2, total 27 course_detilas
  {
    course_id: 15,
    date: thisMonday,
    start_time: '10:00:00',
    duration: 60,
    is_online: 0,
    limitation: 12,
    online_limitation: 0
  },
  {
    course_id: 17,
    date: thisMonday,
    start_time: '14:00:00',
    duration: 60,
    is_online: 0,
    limitation: 16,
    online_limitation: 0
  },
  {
    course_id: 18,
    date: thisMonday,
    start_time: '20:00:00',
    duration: 60,
    is_online: 1,
    limitation: 16,
    online_limitation: 8
  },
  {
    course_id: 21,
    date: thisMonday,
    start_time: '21:00:00',
    duration: 60,
    is_online: 1,
    limitation: 16,
    online_limitation: 4
  },
  {
    course_id: 16,
    date: thisTuesday,
    start_time: '11:00:00',
    duration: 60,
    is_online: 0,
    limitation: 15,
    online_limitation: 0
  },
  {
    course_id: 15,
    date: thisTuesday,
    start_time: '15:00:00',
    duration: 60,
    is_online: 1,
    limitation: 12,
    online_limitation: 3
  },
  {
    course_id: 16,
    date: thisTuesday,
    start_time: '16:00:00',
    duration: 60,
    is_online: 1,
    limitation: 15,
    online_limitation: 5
  },
  {
    course_id: 18,
    date: thisTuesday,
    start_time: '20:00:00',
    duration: 60,
    is_online: 1,
    limitation: 16,
    online_limitation: 8
  },
  {
    course_id: 15,
    date: thisWednesday,
    start_time: '10:00:00',
    duration: 60,
    is_online: 0,
    limitation: 16,
    online_limitation: 0
  },
  {
    course_id: 17,
    date: thisWednesday,
    start_time: '14:00:00',
    duration: 60,
    is_online: 0,
    limitation: 12,
    online_limitation: 0
  },
  {
    course_id: 20,
    date: thisWednesday,
    start_time: '16:00:00',
    duration: 60,
    is_online: 0,
    limitation: 12,
    online_limitation: 0
  },
  {
    course_id: 19,
    date: thisWednesday,
    start_time: '19:00:00',
    duration: 60,
    is_online: 0,
    limitation: 8,
    online_limitation: 0
  },
  {
    course_id: 16,
    date: thisThursday,
    start_time: '09:00:00',
    duration: 60,
    is_online: 0,
    limitation: 18,
    online_limitation: 0
  },
  {
    course_id: 15,
    date: thisThursday,
    start_time: '15:00:00',
    duration: 60,
    is_online: 1,
    limitation: 12,
    online_limitation: 8
  },
  {
    course_id: 20,
    date: thisThursday,
    start_time: '16:00:00',
    duration: 60,
    is_online: 0,
    limitation: 13,
    online_limitation: 0
  },
  {
    course_id: 21,
    date: thisThursday,
    start_time: '21:00:00',
    duration: 60,
    is_online: 1,
    limitation: 18,
    online_limitation: 8
  },
  {
    course_id: 15,
    date: thisFriday,
    start_time: '10:00:00',
    duration: 60,
    is_online: 0,
    limitation: 12,
    online_limitation: 0
  },
  {
    course_id: 17,
    date: thisFriday,
    start_time: '14:00:00',
    duration: 60,
    is_online: 0,
    limitation: 15,
    online_limitation: 0
  },
  {
    course_id: 19,
    date: thisFriday,
    start_time: '19:00:00',
    duration: 60,
    is_online: 0,
    limitation: 16,
    online_limitation: 0
  },
  {
    course_id: 16,
    date: thisSaturday,
    start_time: '11:00:00',
    duration: 60,
    is_online: 0,
    limitation: 13,
    online_limitation: 0
  },
  {
    course_id: 15,
    date: thisSaturday,
    start_time: '15:00:00',
    duration: 60,
    is_online: 1,
    limitation: 13,
    online_limitation: 7
  },
  {
    course_id: 16,
    date: thisSaturday,
    start_time: '16:00:00',
    duration: 60,
    is_online: 1,
    limitation: 18,
    online_limitation: 4
  },
  {
    course_id: 18,
    date: thisSaturday,
    start_time: '20:00:00',
    duration: 60,
    is_online: 0,
    limitation: 16,
    online_limitation: 0
  },
  {
    course_id: 16,
    date: thisSunday,
    start_time: '11:00:00',
    duration: 60,
    is_online: 0,
    limitation: 12,
    online_limitation: 0
  },
  {
    course_id: 16,
    date: thisSunday,
    start_time: '16:00:00',
    duration: 60,
    is_online: 1,
    limitation: 12,
    online_limitation: 8
  },
  {
    course_id: 18,
    date: thisSunday,
    start_time: '20:00:00',
    duration: 60,
    is_online: 0,
    limitation: 16,
    online_limitation: 0
  },
  {
    course_id: 21,
    date: thisSunday,
    start_time: '21:00:00',
    duration: 60,
    is_online: 0,
    limitation: 15,
    online_limitation: 0
  },





  // studio 3, total 23 course_detilas
  {
    course_id: 22,
    date: thisMonday,
    start_time: '10:00:00',
    duration: 60,
    is_online: 0,
    limitation: 16,
    online_limitation: 0
  },
  {
    course_id: 24,
    date: thisMonday,
    start_time: '14:00:00',
    duration: 60,
    is_online: 0,
    limitation: 12,
    online_limitation: 0
  },
  {
    course_id: 25,
    date: thisMonday,
    start_time: '19:00:00',
    duration: 60,
    is_online: 0,
    limitation: 18,
    online_limitation: 0
  },
  {
    course_id: 27,
    date: thisTuesday,
    start_time: '09:00:00',
    duration: 60,
    is_online: 0,
    limitation: 14,
    online_limitation: 0
  },
  {
    course_id: 23,
    date: thisTuesday,
    start_time: '11:00:00',
    duration: 60,
    is_online: 0,
    limitation: 14,
    online_limitation: 0
  },
  {
    course_id: 29,
    date: thisTuesday,
    start_time: '15:00:00',
    duration: 60,
    is_online: 0,
    limitation: 16,
    online_limitation: 0
  },
  {
    course_id: 26,
    date: thisTuesday,
    start_time: '20:00:00',
    duration: 60,
    is_online: 0,
    limitation: 14,
    online_limitation: 0
  },
  {
    course_id: 27,
    date: thisWednesday,
    start_time: '09:00:00',
    duration: 60,
    is_online: 0,
    limitation: 12,
    online_limitation: 0
  },
  {
    course_id: 22,
    date: thisWednesday,
    start_time: '10:00:00',
    duration: 60,
    is_online: 0,
    limitation: 16,
    online_limitation: 0
  },
  {
    course_id: 28,
    date: thisWednesday,
    start_time: '14:00:00',
    duration: 60,
    is_online: 1,
    limitation: 12,
    online_limitation: 8
  },
  {
    course_id: 24,
    date: thisWednesday,
    start_time: '16:00:00',
    duration: 60,
    is_online: 0,
    limitation: 16,
    online_limitation: 0
  },
  {
    course_id: 26,
    date: thisWednesday,
    start_time: '20:00:00',
    duration: 60,
    is_online: 0,
    limitation: 16,
    online_limitation: 0
  },
  {
    course_id: 23,
    date: thisThursday,
    start_time: '11:00:00',
    duration: 60,
    is_online: 0,
    limitation: 18,
    online_limitation: 0
  },
  {
    course_id: 24,
    date: thisThursday,
    start_time: '16:00:00',
    duration: 60,
    is_online: 0,
    limitation: 15,
    online_limitation: 0
  },
  {
    course_id: 25,
    date: thisThursday,
    start_time: '19:00:00',
    duration: 60,
    is_online: 0,
    limitation: 12,
    online_limitation: 0
  },
  {
    course_id: 22,
    date: thisFriday,
    start_time: '10:00:00',
    duration: 60,
    is_online: 1,
    limitation: 18,
    online_limitation: 6
  },
  {
    course_id: 30,
    date: thisFriday,
    start_time: '15:00:00',
    duration: 60,
    is_online: 0,
    limitation: 14,
    online_limitation: 0
  },
  {
    course_id: 25,
    date: thisFriday,
    start_time: '19:00:00',
    duration: 60,
    is_online: 0,
    limitation: 18,
    online_limitation: 0
  },
  {
    course_id: 23,
    date: thisSaturday,
    start_time: '11:00:00',
    duration: 60,
    is_online: 1,
    limitation: 18,
    online_limitation: 6
  },
  {
    course_id: 26,
    date: thisSaturday,
    start_time: '20:00:00',
    duration: 60,
    is_online: 0,
    limitation: 16,
    online_limitation: 0
  },
  {
    course_id: 30,
    date: thisSunday,
    start_time: '10:00:00',
    duration: 60,
    is_online: 0,
    limitation: 12,
    online_limitation: 0
  },
  {
    course_id: 28,
    date: thisSunday,
    start_time: '14:00:00',
    duration: 60,
    is_online: 1,
    limitation: 15,
    online_limitation: 5
  },
  {
    course_id: 26,
    date: thisSunday,
    start_time: '20:00:00',
    duration: 60,
    is_online: 0,
    limitation: 18,
    online_limitation: 0
  },





  // studio 4, total 26 course_detilas
  {
    course_id: 34,
    date: thisMonday,
    start_time: '10:00:00',
    duration: 60,
    is_online: 0,
    limitation: 12,
    online_limitation: 0
  },
  {
    course_id: 33,
    date: thisMonday,
    start_time: '16:00:00',
    duration: 60,
    is_online: 1,
    limitation: 14,
    online_limitation: 4
  },
  {
    course_id: 31,
    date: thisMonday,
    start_time: '19:00:00',
    duration: 60,
    is_online: 0,
    limitation: 16,
    online_limitation: 0
  },
  {
    course_id: 35,
    date: thisTuesday,
    start_time: '09:00:00',
    duration: 60,
    is_online: 0,
    limitation: 16,
    online_limitation: 0
  },
  {
    course_id: 38,
    date: thisTuesday,
    start_time: '11:00:00',
    duration: 60,
    is_online: 1,
    limitation: 12,
    online_limitation: 6
  },
  {
    course_id: 36,
    date: thisTuesday,
    start_time: '15:00:00',
    duration: 60,
    is_online: 0,
    limitation: 13,
    online_limitation: 0
  },
  {
    course_id: 32,
    date: thisTuesday,
    start_time: '20:00:00',
    duration: 60,
    is_online: 0,
    limitation: 14,
    online_limitation: 0
  },
  {
    course_id: 38,
    date: thisWednesday,
    start_time: '11:00:00',
    duration: 60,
    is_online: 1,
    limitation: 14,
    online_limitation: 4
  },
  {
    course_id: 36,
    date: thisWednesday,
    start_time: '15:00:00',
    duration: 60,
    is_online: 0,
    limitation: 17,
    online_limitation: 0
  },
  {
    course_id: 31,
    date: thisWednesday,
    start_time: '19:00:00',
    duration: 60,
    is_online: 0,
    limitation: 12,
    online_limitation: 0
  },
  {
    course_id: 39,
    date: thisWednesday,
    start_time: '21:00:00',
    duration: 60,
    is_online: 0,
    limitation: 16,
    online_limitation: 0
  },
  {
    course_id: 34,
    date: thisThursday,
    start_time: '10:00:00',
    duration: 60,
    is_online: 0,
    limitation: 16,
    online_limitation: 0
  },
  {
    course_id: 33,
    date: thisThursday,
    start_time: '16:00:00',
    duration: 60,
    is_online: 1,
    limitation: 18,
    online_limitation: 8
  },
  {
    course_id: 32,
    date: thisThursday,
    start_time: '20:00:00',
    duration: 60,
    is_online: 0,
    limitation: 18,
    online_limitation: 0
  },
  {
    course_id: 34,
    date: thisFriday,
    start_time: '10:00:00',
    duration: 60,
    is_online: 0,
    limitation: 16,
    online_limitation: 0
  },
  {
    course_id: 37,
    date: thisFriday,
    start_time: '14:00:00',
    duration: 60,
    is_online: 1,
    limitation: 22,
    online_limitation: 8
  },
  {
    course_id: 37,
    date: thisFriday,
    start_time: '15:00:00',
    duration: 60,
    is_online: 1,
    limitation: 22,
    online_limitation: 8
  },
  {
    course_id: 31,
    date: thisFriday,
    start_time: '19:00:00',
    duration: 60,
    is_online: 0,
    limitation: 12,
    online_limitation: 0
  },
  {
    course_id: 35,
    date: thisSaturday,
    start_time: '09:00:00',
    duration: 60,
    is_online: 0,
    limitation: 13,
    online_limitation: 0
  },
  {
    course_id: 33,
    date: thisSaturday,
    start_time: '16:00:00',
    duration: 60,
    is_online: 0,
    limitation: 18,
    online_limitation: 0
  },
  {
    course_id: 32,
    date: thisSaturday,
    start_time: '20:00:00',
    duration: 60,
    is_online: 0,
    limitation: 18,
    online_limitation: 0
  },
  {
    course_id: 35,
    date: thisSunday,
    start_time: '09:00:00',
    duration: 60,
    is_online: 0,
    limitation: 13,
    online_limitation: 0
  },
  {
    course_id: 40,
    date: thisSunday,
    start_time: '11:00:00',
    duration: 60,
    is_online: 1,
    limitation: 19,
    online_limitation: 5
  },
  {
    course_id: 40,
    date: thisSunday,
    start_time: '14:00:00',
    duration: 60,
    is_online: 1,
    limitation: 19,
    online_limitation: 5
  },
  {
    course_id: 33,
    date: thisSunday,
    start_time: '16:00:00',
    duration: 60,
    is_online: 0,
    limitation: 12,
    online_limitation: 0
  },
  {
    course_id: 39,
    date: thisSunday,
    start_time: '21:00:00',
    duration: 60,
    is_online: 0,
    limitation: 19,
    online_limitation: 0
  },





  // studio 5, total 24 course_detilas
  {
    course_id: 49,
    date: thisMonday,
    start_time: '09:00:00',
    duration: 60,
    is_online: 1,
    limitation: 16,
    online_limitation: 6
  },
  {
    course_id: 43,
    date: thisMonday,
    start_time: '14:00:00',
    duration: 60,
    is_online: 0,
    limitation: 18,
    online_limitation: 0
  },
  {
    course_id: 43,
    date: thisMonday,
    start_time: '15:00:00',
    duration: 60,
    is_online: 0,
    limitation: 18,
    online_limitation: 0
  },
  {
    course_id: 47,
    date: thisMonday,
    start_time: '19:00:00',
    duration: 60,
    is_online: 0,
    limitation: 12,
    online_limitation: 0
  },
  {
    course_id: 41,
    date: thisTuesday,
    start_time: '11:00:00',
    duration: 60,
    is_online: 1,
    limitation: 16,
    online_limitation: 6
  },
  {
    course_id: 45,
    date: thisTuesday,
    start_time: '16:00:00',
    duration: 60,
    is_online: 1,
    limitation: 14,
    online_limitation: 8
  },
  {
    course_id: 46,
    date: thisTuesday,
    start_time: '20:00:00',
    duration: 60,
    is_online: 0,
    limitation: 14,
    online_limitation: 0
  },
  {
    course_id: 46,
    date: thisTuesday,
    start_time: '21:00:00',
    duration: 60,
    is_online: 0,
    limitation: 14,
    online_limitation: 0
  },
  {
    course_id: 49,
    date: thisWednesday,
    start_time: '09:00:00',
    duration: 60,
    is_online: 1,
    limitation: 14,
    online_limitation: 7
  },
  {
    course_id: 41,
    date: thisWednesday,
    start_time: '11:00:00',
    duration: 60,
    is_online: 1,
    limitation: 16,
    online_limitation: 6
  },
  {
    course_id: 47,
    date: thisWednesday,
    start_time: '19:00:00',
    duration: 60,
    is_online: 1,
    limitation: 15,
    online_limitation: 5
  },
  {
    course_id: 42,
    date: thisThursday,
    start_time: '10:00:00',
    duration: 60,
    is_online: 0,
    limitation: 12,
    online_limitation: 0
  },
  {
    course_id: 42,
    date: thisThursday,
    start_time: '15:00:00',
    duration: 60,
    is_online: 0,
    limitation: 12,
    online_limitation: 0
  },
  {
    course_id: 42,
    date: thisThursday,
    start_time: '16:00:00',
    duration: 60,
    is_online: 0,
    limitation: 12,
    online_limitation: 0
  },
  {
    course_id: 42,
    date: thisThursday,
    start_time: '20:00:00',
    duration: 60,
    is_online: 0,
    limitation: 12,
    online_limitation: 0
  },
  {
    course_id: 41,
    date: thisFriday,
    start_time: '11:00:00',
    duration: 60,
    is_online: 0,
    limitation: 16,
    online_limitation: 0
  },
  {
    course_id: 48,
    date: thisFriday,
    start_time: '21:00:00',
    duration: 60,
    is_online: 1,
    limitation: 18,
    online_limitation: 8
  },
  {
    course_id: 49,
    date: thisSaturday,
    start_time: '09:00:00',
    duration: 60,
    is_online: 0,
    limitation: 17,
    online_limitation: 0
  },
  {
    course_id: 41,
    date: thisSaturday,
    start_time: '11:00:00',
    duration: 60,
    is_online: 0,
    limitation: 12,
    online_limitation: 0
  },
  {
    course_id: 45,
    date: thisSaturday,
    start_time: '16:00:00',
    duration: 60,
    is_online: 0,
    limitation: 13,
    online_limitation: 0
  },
  {
    course_id: 48,
    date: thisSaturday,
    start_time: '21:00:00',
    duration: 60,
    is_online: 1,
    limitation: 18,
    online_limitation: 4
  },
  {
    course_id: 49,
    date: thisSunday,
    start_time: '09:00:00',
    duration: 60,
    is_online: 0,
    limitation: 16,
    online_limitation: 0
  },
  {
    course_id: 45,
    date: thisSunday,
    start_time: '16:00:00',
    duration: 60,
    is_online: 0,
    limitation: 19,
    online_limitation: 0
  },
  {
    course_id: 47,
    date: thisSunday,
    start_time: '19:00:00',
    duration: 60,
    is_online: 0,
    limitation: 13,
    online_limitation: 0
  }
]


const insertCourseInCertainWeek = async () => {
  try {
    for (const detail of SEED_COURSE_DETAIL) {
      detail.publish_at = currentTime
      detail.created_at = currentTime
      detail.updated_at = currentTime
    }

    await db.query(
      'INSERT INTO course_details (course_id, date, start_time, duration, is_online, limitation, online_limitation, publish_at, created_at, updated_at) VALUE ?',
      [SEED_COURSE_DETAIL.map(detail => {
        return [detail.course_id, detail.date, detail.start_time, detail.duration, detail.is_online, detail.limitation, detail.online_limitation, detail.publish_at, detail.created_at, detail.updated_at]
      })]
    )
    console.log(`insert course from ${thisMonday} to ${thisSunday} is done`)
    process.exit()
  } catch (err) {
    console.log(err)
    process.exit()
  }
}

insertCourseInCertainWeek()

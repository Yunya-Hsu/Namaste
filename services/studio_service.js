// models
const StudioModel = require('../models/studio_model')
const AdminStudioModel = require('../models/admin_studio_model')
const AuthModel = require('../models/auth_model')

const TimeService = require('../util/time')

const moment = require('moment') // FIXME:

class StudioDetail {
  constructor (req) {
    this.subdomain = req.params.studioSubdomain
  }

  organizeData (studio) {
    this.id = studio.id
    this.name = studio.name
    this.logo = process.env.AWS_CDN_DOMAIN + studio.logo
    this.introduction_title = studio.introduction_title
    this.introduction_detail = studio.introduction_detail
    this.introduction_photo = process.env.AWS_CDN_DOMAIN + studio.introduction_photo
    this.address = studio.address
    this.address_description = studio.address_description
    this.phone = studio.phone
    this.tappay_app_key = studio.tappay_app_key
    this. tappay_partner_key = studio.tappay_partner_key
    this.tappay_id = studio.tappay_id
    this.tappay_app_id = studio.tappay_app_id
  }

  async getStudioBySubdomain () {
    const theStudio = await StudioModel.getStudioBySubdomain(this.subdomain)
    if (!theStudio) {
      return
    }
    this.organizeData(theStudio)
  }

  async getDataForHomePage () {
    const theStudio = await StudioModel.getStudioForHomePage(this.subdomain)
    this.organizeData(theStudio)
  }

  async getPriceRules () {
    const currentTime = TimeService.currentTime()
    return await StudioModel.getPriceRules(this.id, currentTime)
  }

  async getStudioForCheckout () {
    const theStudio = await StudioModel.getStudioForCheckout(this.subdomain)
    this.organizeData(theStudio)
  }

  async getDedicatedPriceRule (priceRuleId) {
    const currentTime = TimeService.currentTime()
    const priceRule = await StudioModel.getDedicatedPriceRule(priceRuleId, currentTime, this.id)
    if (!priceRule) {
      return
    }
    priceRule.expireDate = TimeService.expireDate(priceRule.term)
    return priceRule
  }

  async getStudioForAbout () {
    const theStudio = await StudioModel.getStudioForAbout(this.subdomain)
    this.organizeData(theStudio)
  }

  async getTeachers () {
    const teacherList = await StudioModel.getTeachers(this.id)
    for (const teacher of teacherList) {
      if (teacher.avatar) {
        teacher.avatar = process.env.AWS_CDN_DOMAIN + teacher.avatar
      }
    }
    return teacherList
  }

  async getCourseDetail (courseDetailId) {
    return await AdminStudioModel.getCourseDetail(this.subdomain, courseDetailId)
  }
}

class CourseInWeek {
  constructor (req) {
    this.theYear = req.query.week ? req.query.week.split('-')[0] : TimeService.currentYear()
    this.theWeek = req.query.week ? Number(req.query.week.split('-')[1].replace('W', '')) : TimeService.currentWeek()
    this.theWeekForRender = this.theWeek.toString().length < 2 ? this.theWeek.toString().padStart(2, '0') : this.theWeek
    
    this.organizedCourseDetailList = organizedCourseDetailList(this.theYear, this.theWeek)
  }

  async getCourseDetails(id) {
    const noontime = TimeService.noonTime()
    const dinnerTime = TimeService.dinnerTime()

    const courseDetailList = await StudioModel.getCourseDetails(id, this.organizedCourseDetailList.Monday.date, this.organizedCourseDetailList.Sunday.date, TimeService.currentTime())

    for (const course of courseDetailList) {
      const theDayOfWeek = moment(course.date).format('dddd')
      const end_time = moment(course.start_time, 'HH:mm:ss').add(course.duration, 'minutes').format('HH:mm')
      course.end_time = end_time
      course.start_time = moment(course.start_time, 'HH:mm:ss').format('HH:mm')

      if (moment(course.start_time, 'HH:mm').isBefore(noontime)) {
        this.organizedCourseDetailList[theDayOfWeek].morning.push(course)
      } else if (moment(course.start_time, 'HH:mm').isBefore(dinnerTime)) {
        this.organizedCourseDetailList[theDayOfWeek].afternoon.push(course)
      } else {
        this.organizedCourseDetailList[theDayOfWeek].evening.push(course)
      }
    }
  }
}

class UserPermission {
  constructor (userId, studioId) {
    this.userId = userId
    this.studioId = studioId
  }

  async authorize(permissionId) {
    const roleList = await AuthModel.getUserRoles(this.userId)
    const verifyResult = roleList.some(element => {
      return element.studio_id === this.studioId && element.permission_id === permissionId
    })
    return verifyResult
  }
}

const organizedCourseDetailList = (theYear, theWeek) => {
  const theMonday = moment().year(theYear).day('Monday').isoWeek(theWeek).format('YYYY-MM-DD')

  const organizedCourseDetailList = {}
  for (let i = 0; i < 7; i++) {
    // 星期幾
    const theDayOfWeek = moment(theMonday).add(i, 'days').format('dddd')
    const theDate = moment().year(theYear).day('Monday').isoWeek(theWeek).add(i, 'days').format('YYYY-MM-DD')
    organizedCourseDetailList[theDayOfWeek] = {
      date: theDate,
      morning: [],
      afternoon: [],
      evening: []
    }
  }
  return organizedCourseDetailList
}






module.exports = {
  StudioDetail,
  CourseInWeek,
  UserPermission,
}
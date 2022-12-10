// models
const AdminStudioModel = require('../models/admin_studio_model')
const StudioModel = require('../models/studio_model')

const { inputTimeReformat, timeFormatToHTML, currentTime } = require('../util/time')

class PriceRule {
  constructor (req) {
    this.category = req.body.category
    this.price = +req.body.price
    this.point = +req.body.point
    this.remark = req.body.remark || ''
    this.term = +req.body.term
    this.publishAt = inputTimeReformat(req.body.publish_at)
    this.currentTime = currentTime()
    this.priceRuleId = +req.params.priceRuleId
  }

  async create(studioId) {
    await AdminStudioModel.createPriceRule(studioId, this.category, this.price, this.point, this.remark, this.term, this.publishAt, this.currentTime, this.currentTime)
  }

  async update() {
    await AdminStudioModel.updatePriceRule(this.priceRuleId, this.category, this.price, this.point, this.remark, this.term, this.publishAt, this.currentTime)
  }

  async getOne(studioId) {
    const result = await AdminStudioModel.getDedicatedPriceRule(studioId, this.priceRuleId)
    if (!result) {
      return
    }
    result.publish_at = timeFormatToHTML(result.publish_at)
    return result
  }

  static async getAll(studioId) {
    return await AdminStudioModel.getPriceRules(studioId)
  }
}

class Course {
  constructor (req) {
    this.title = req.body.title
    this.description = req.body.description
    this.teacherId = req.body.teacher_id
    this.livestreamAccount = req.body.livestreamAccount
    this.point = req.body.point
    this.publishAt = inputTimeReformat(req.body.publish_at)
    this.currentTime = currentTime()
    this.courseId = req.params.courseId
  }

  static async getTeachers(studioId) {
    return await AdminStudioModel.getStudioTeachers(studioId)
  }

  async create(studioId) {
    await AdminStudioModel.createCourse(this.title, this.description, this.teacherId, studioId, this.livestreamAccount, this.point, this.currentTime)
  }

  async getOne(studioId) {
    return await AdminStudioModel.getDedicatedCourse(studioId, this.courseId)
  }

  async update() {
    await AdminStudioModel.updateCourse(this.courseId, this.title, this.description, this.teacherId, this.livestreamAccount, this.point, this.currentTime)
  }

  static async getAll(studioId) {
    return await AdminStudioModel.getStudioCourses(studioId)
  }
}

class CourseDetail {
  constructor (req) {
    this.courseId = req.body.course_id
    this.date = req.body.date
    this.startTime = req.body.start_time
    this.duration = req.body.duration
    this.limitation = req.body.limitation
    this.isOnline = req.body.is_online
    this.onlineLimitation = req.body.online_limitation
    this.isOneOnOne = req.body.is_oneOnOne
    this.publishAt = inputTimeReformat(req.body.publish_at)
    this.currentTime = currentTime()
    this.CourseDetailId = req.params.courseDetailId
  }

  static async getCourseList(studioId) {
    return await AdminStudioModel.getStudioCourses(studioId)
  }

  async create() {
    await AdminStudioModel.createCourseDetail(this.courseId, this.date, this.startTime, this.duration, this.isOnline, this.limitation, this.onlineLimitation, this.isOneOnOne, this.publishAt, this.currentTime)
  }

  async getOne(studioId) {
    const result = await AdminStudioModel.getDedicatedCourseDetail(studioId, this.CourseDetailId)
    if (!result) {
      return
    }
    result.publish_at = timeFormatToHTML(result.publish_at)
    return result
  }

  async update() {
    await AdminStudioModel.updateCourseDetail(this.CourseDetailId, this.date, this.startTime, this.duration, this.isOnline, this.limitation, this.onlineLimitation, this.isOneOnOne, this.publishAt, this.currentTime)
  }

  static async getAll(studioId) {
    return await AdminStudioModel.getStudioCourseDetail(studioId)
  }
}

class Teacher {
  constructor (req) {
    this.name = req.body.name
    this.avatar = req.body.avatar
    this.major = req.body.major
    this.introduction = req.body.introduction
    this.currentTime = currentTime()
    this.teacherId = req.params.teacherId
  }

  async create(studioId) {
    await AdminStudioModel.createTeacher(this.name, this.avatar, this.major, this.introduction, studioId, this.currentTime)
  }

  async getOne(studioId) {
    return await AdminStudioModel.getDedicatedTeacher(studioId, this.teacherId)
  }

  async update() {
    if (this.avatar) {
      return await AdminStudioModel.updateTeacherWithAvatar(this.teacherId, this.name, this.avatar, this.major, this.introduction, this.currentTime)
    }
    return await AdminStudioModel.updateTeacherWithoutAvatar(this.teacherId, this.name, this.major, this.introduction, this.currentTime)
  }

  static async getAll(studioId) {
    const teacherList = await StudioModel.getTeachers(studioId)
    if (teacherList) {
      for (const teacher of teacherList) {
        teacher.avatar = process.env.AWS_CDN_DOMAIN + teacher.avatar
      }
    }
    return teacherList
  }
}

module.exports = {
  PriceRule,
  Course,
  CourseDetail,
  Teacher
}
// models
const AdminStudioModel = require('../models/admin_studio_model')

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

module.exports = {
  PriceRule,
  Course
}
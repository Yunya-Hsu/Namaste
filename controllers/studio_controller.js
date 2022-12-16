/* eslint-disable camelcase */
const moment = require('moment-timezone')
const axios = require('axios')

// models
const StudioAdmin = require('../models/admin_studio_model')
const Studio = require('../models/studio_model')

// services 
const { CourseInWeek } = require('../services/studio_service')

const renderHomePage = async (req, res, next) => {
  await req.studio.getDataForHomePage()
  return res.render('studio/home', { studio: req.studio })
}

const renderPricePage = async (req, res, next) => {  
  const priceRules = await req.studio.getPriceRules()
  res.render('studio/price', { studio: req.studio, priceRules })
}

const renderCoursePage = async (req, res, next) => {
  const courseInWeek = new CourseInWeek(req)
  if (courseInWeek.theWeek > 53) {
    return next()
  }
  await courseInWeek.getCourseDetails(req.studio.id)
  res.render('studio/course', {
    theYear: courseInWeek.theYear,
    theWeek: courseInWeek.theWeekForRender,
    studio: req.studio,
    organizedCourseDetailList: courseInWeek.organizedCourseDetailList
  })
}

const renderAboutPage = async (req, res, next) => {
  await req.studio.getStudioForAbout()
  const teacherList = await req.studio.getTeachers()
  res.render('studio/about', { studio: req.studio, teacherList })
}

const renderCheckoutPage = async (req, res, next) => {
  await req.studio.getStudioForCheckout()
  const priceRule = await req.studio.getDedicatedPriceRule(req.query.priceRuleId)
  if (!priceRule) {
    req.flash('errorMessage', '該教室無此價格')
    return res.redirect('back')
  }
  const TappayServerType = process.env.TAPPAY_SERVER_TYPE

  res.render('studio/checkout', {
    studio: req.studio,
    priceRule,
    TappayServerType
  })
}

const checkout = async (req, res, next) => {
  // 判斷 prime & price rule id 是否齊全
  const { prime, priceRuleId, cardholder } = req.body
  if (!prime || !priceRuleId || !cardholder.phone_number || !cardholder.name || !cardholder.email) {
    return res.status(400).json({
      error: 'without necessary information'
    })
  }

  // 撈出訂單資料 & studio tappay 資料
  const currentTime = moment().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')
  const studio = await Studio.getStudioForCheckout(req.studio.subdomain)
  const priceRule = await Studio.getDedicatedPriceRule(priceRuleId, currentTime, studio.id)
  if (!priceRule || !studio) {
    return res.status(400).json({
      error: 'wrong price rule'
    })
  }

  // 建立 order
  const expireDate = moment().tz('Asia/Taipei').add(priceRule.term, 'days').format('YYYY-MM-DD HH:mm:ss')
  const newOrderId = await Studio.createOrder(req.user.id, studio.id, currentTime, priceRule.price, priceRule.point, expireDate)

  // 向 tappay 請款
  const postDataToTapPay = {
    prime,
    partner_key: studio.tappay_partner_key,
    merchant_id: studio.tappay_id,
    amount: priceRule.price,
    details: `${studio.name} - ${priceRule.category}`,
    cardholder,
    remember: false
  }
  const tapPayResponse = await axios.post(
    process.env.TAPPAY_URL,
    postDataToTapPay,
    {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': studio.tappay_partner_key
      }
    }
  )

  // 若 tapPayResponse status 不為 0，傳送 error message
  if (tapPayResponse.data.status !== 0) {
    console.error(`${newOrderId} has TapPay error: `)
    console.error(tapPayResponse)
    return res.status(400).json({
      error: 'TapPay prime error',
      data: { number: newOrderId }
    })
  }

  // 若成功，更新 orders table 中的訂單狀態
  await Studio.updateOrderStatus(newOrderId, tapPayResponse.data.rec_trade_id)
  res.json({ data: 'success' })
}

const registerCourse = async (req, res, next) => {
  // 取得 course detail id
  const courseDetailId = +req.query.courseDetailId
  const isBookOnlineCourse = +req.query.isOnline
  const isBookOneOnOne = +req.query.isOneOnOne
  if (isNaN(courseDetailId) || isNaN(isBookOnlineCourse) || isNaN(isBookOneOnOne)) {
    req.flash('errorMessage', '課程有誤')
    return res.redirect('back')
  }

  // 確認該 user 是否有登記過此課程
  const isRegisterBefore = await Studio.getRegistration(req.user.id, courseDetailId)
  if (isRegisterBefore) {
    req.flash('errorMessage', '已預約，不可重複登記')
    return res.redirect('back')
  }

  // 取得該堂課資料，確認是否還有空位
  const courseDetail = await Studio.getDedicatedCourseDetail(courseDetailId)
  if (isBookOnlineCourse === 0 && courseDetail.limitation <= 0) {
    req.flash('errorMessage', '實體課程已滿')
    return res.redirect('back')
  }
  if (isBookOnlineCourse === 1 && courseDetail.online_limitation <= 0) {
    req.flash('errorMessage', '線上課程已滿')
    return res.redirect('back')
  }

  // 確認目前時間是否還可以預約
  const currentTime = moment().tz('Asia/Taipei')
  const courseStartTime = moment(courseDetail.date + ' ' + courseDetail.start_time).tz('Asia/Taipei', true)
  if (currentTime.isAfter(courseStartTime)) {
    req.flash('errorMessage', '課程時間已過，無法預約')
    return res.redirect('back')
  }

  // 撈出 user 訂單資訊，確認該 user 剩餘點數是否足夠、該對哪幾張訂單進行扣款
  const userOrder = await Studio.getUserOrder(req.user.id, courseDetail.studio_id, currentTime.format('YYYY-MM-DD HH:mm:ss'))
  if (userOrder.length <= 0) {
    req.flash('errorMessage', '請先購買點數')
    return res.redirect('back')
  }

  // 計算要對哪幾筆 order 扣款
  let accumulatedNecessaryPoint = courseDetail.point
  const requiredOrderList = []
  const deductionList = []

  for (const order of userOrder) {
    if (order.remaining_point >= accumulatedNecessaryPoint) {
      requiredOrderList.push(order.id)
      deductionList.push(accumulatedNecessaryPoint)
      accumulatedNecessaryPoint -= accumulatedNecessaryPoint
      break
    } else {
      requiredOrderList.push(order.id)
      deductionList.push(order.remaining_point)
      accumulatedNecessaryPoint -= order.remaining_point
    }
  }
  if (accumulatedNecessaryPoint > 0) {
    req.flash('errorMessage', '點數不足')
    return res.redirect('back')
  }

  // 扣除點數
  const registrationInsertId = await Studio.registerCourse(courseDetail, isBookOnlineCourse, isBookOneOnOne, requiredOrderList, deductionList, req.user.id, currentTime.format('YYYY-MM-DD HH:mm:ss'))
  if (!registrationInsertId) {
    req.flash('errorMessage', '預約失敗')
    return res.redirect('back')
  }
  req.flash('successMessage', '預約成功')
  return res.redirect('back')
}

const deregisterCourse = async (req, res, next) => {
  const { registrationId } = req.body
  const registerDetail = await Studio.getRegisterDetail(registrationId) // 取得該筆預約紀錄
  const registerAndOrderList = await Studio.getRegisterAndOrderRelationship(registrationId) // 確認要對把點數返還哪幾張 order

  if (!registerDetail || !registerAndOrderList) {
    req.flash('errorMessage', '課程編號有誤')
    return res.redirect('back')
  }

  // 確認目前時間是否晚於取消時間（課程開始前 3 小時）
  const currentTime = moment().tz('Asia/Taipei')
  const lastMomentToCancel = moment(registerDetail.date + ' ' + registerDetail.start_time).tz('Asia/Taipei', true).subtract(3, 'hours')
  if (currentTime.isAfter(lastMomentToCancel)) {
    req.flash('errorMessage', '取消時間已過，無法取消')
    return res.redirect('back')
  }


  await Studio.deregisterCourse(registrationId, registerDetail, registerAndOrderList, currentTime.format('YYYY-MM-DD HH:mm:ss'))

  req.flash('successMessage', '取消成功')
  return res.redirect('back')
}



const renderLivePage = async (req, res, next) => {
  const livestreamPage = {
    live: 'studio/livestream',
    oneOnOne: 'studio/oneOnOne'
  }
  const { livestreamType } = req.params
  const courseDetailId = req.query.courseDetailId
  const userId = req.user.id

  const courseDetail = await req.studio.getCourseDetail(courseDetailId)
  if (!courseDetail) {
    return next()
  }
  const verifyRegistration = await Studio.verifyRegistration(userId, courseDetailId, req.studio.subdomain)
  if (!verifyRegistration) {
    req.flash('errorMessage', '未註冊此課程')
    return res.redirect('/')
  }

  res.render(livestreamPage[livestreamType], {
    studio: req.studio,
    courseDetailId,
    userId,
    courseName: verifyRegistration.course_title
  })
}




module.exports = {
  renderHomePage,
  renderPricePage,
  renderCoursePage,
  renderAboutPage,
  renderCheckoutPage,

  checkout,
  
  registerCourse,
  deregisterCourse,

  renderLivePage
}

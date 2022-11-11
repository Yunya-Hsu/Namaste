/* eslint-disable camelcase */
const moment = require('moment-timezone')
const axios = require('axios')

// models
const StudioAdmin = require('../models/admin_studio_model')
const Studio = require('../models/studio_model')

const renderHomePage = async (req, res) => {
  // search studio from DB
  const { studioSubdomain } = req.params
  const studio = await Studio.getStudioBySubdomain(studioSubdomain) // FIXME:
  if (!studio) {
    return res.redirect('/404.html') // FIXME:
  }
  studio.logo = process.env.SERVER_IP + studio.logo

  res.render('studio/home', { studio })
}

const renderPricePage = async (req, res) => {
  // 確認是否有該教室
  const { studioSubdomain } = req.params
  const studio = await Studio.getStudioBySubdomain(studioSubdomain)
  if (!studio) {
    return res.redirect('/404.html') // FIXME:
  }
  studio.logo = process.env.SERVER_IP + studio.logo

  // 取出該教室的價格
  const currentTime = moment().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')
  const priceRules = await Studio.getPriceRules(studio.id, currentTime)
  if (priceRules.length <= 0) {
    return res.render('studio/price', { studio })
  }

  res.render('studio/price', { studio, priceRules })
}

const renderCoursePage = async (req, res) => {
  // 確認是否有該教室
  const { studioSubdomain } = req.params
  const studio = await Studio.getStudioBySubdomain(studioSubdomain)
  if (!studio) {
    return res.redirect('/404.html') // FIXME:
  }
  studio.logo = process.env.SERVER_IP + studio.logo


  // 算出所需的區間
  const theYear = req.query.week ? req.query.week.split('-')[0] : moment().tz('Asia/Taipei').format('YYYY')
  const theWeek = req.query.week ? Number(req.query.week.split('-')[1].replace('W', '')) : moment().tz('Asia/Taipei').isoWeek()
  if (theWeek > 53) {
    return res.redirect('/404.html') // FIXME:
  }
  const theMonday = moment().year(theYear).day('Monday').isoWeek(theWeek).format('YYYY-MM-DD')
  const theSunday = moment(theMonday, 'YYYY-MM-DD').add(6, 'days').format('YYYY-MM-DD')
  const currentTime = moment().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')

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


  // 依照區間取出該教室的 course detail 清單
  const courseDetailList = await Studio.getCourseDetails(studio.id, theMonday, theSunday, currentTime)


  // 分類
  const noontime = moment('12:00', 'HH:mm')
  const dinnerTime = moment('18:00', 'HH:mm')
  for (const course of courseDetailList) {
    const theDayOfWeek = moment(course.date).format('dddd')
    const end_time = moment(course.start_time, 'HH:mm:ss').add(course.duration, 'minutes').format('HH:mm')
    course.end_time = end_time
    course.start_time = moment(course.start_time, 'HH:mm:ss').format('HH:mm')

    if (moment(course.start_time, 'HH:mm').isBefore(noontime)) {
      organizedCourseDetailList[theDayOfWeek].morning.push(course)
    } else if (moment(course.start_time, 'HH:mm').isBefore(dinnerTime)) {
      organizedCourseDetailList[theDayOfWeek].afternoon.push(course)
    } else {
      organizedCourseDetailList[theDayOfWeek].evening.push(course)
    }
  }

  res.render('studio/course', {
    studio,
    organizedCourseDetailList
  })
}

const renderAboutPage = async (req, res) => {
  const { studioName } = req.params

  res.send(`<h1 style="color: pink">This is ${studioName} teacher page</h1>`)
}

const renderCheckoutPage = async (req, res) => {
  // search studio from DB
  const { studioSubdomain } = req.params
  const studio = await Studio.getStudioForCheckout(studioSubdomain)
  if (!studio) {
    return res.redirect('/404.html') // FIXME:
  }
  studio.logo = process.env.SERVER_IP + studio.logo

  // get the price rule
  const priceRuleId = req.query.priceRuleId
  const currentTime = moment().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')
  const priceRule = await Studio.getDedicatedPriceRule(priceRuleId, currentTime, studio.id)
  if (!priceRule) {
    req.flash('errorMessage', '無此課程')
    return res.redirect('back')
  }
  priceRule.expireDate = moment().tz('Asia/Taipei').add(priceRule.term, 'days').format('YYYY-MM-DD')
  const TappayServerType = process.env.TAPPAY_SERVER_TYPE

  res.render('studio/checkout', {
    studio,
    priceRule,
    TappayServerType
  })
}

const checkout = async (req, res) => {
  // 判斷 prime & price rule id 是否齊全
  const { prime, priceRuleId, cardholder } = req.body
  if (!prime || !priceRuleId || !cardholder.phone_number || !cardholder.name || !cardholder.email) {
    return res.status(400).json({
      error: 'without necessary information'
    })
  }

  // 撈出訂單資料 & studio tappay 資料
  const { studioSubdomain } = req.params
  const currentTime = moment().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')
  const studio = await Studio.getStudioForCheckout(studioSubdomain)
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
    console.log(`${newOrderId} has TapPay error: `)
    console.log(tapPayResponse)
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
  if (isNaN(courseDetailId) || isNaN(isBookOnlineCourse)) {
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

  // 撈出 user 訂單資訊，確認該 user 剩餘點數是否足夠、該對哪幾張訂單進行扣款
  const userOrder = await Studio.getUserOrder(req.user.id, courseDetail.studio_id)
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
  const currentTime = moment().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')
  const registrationInsertId = await Studio.registerCourse(courseDetail, isBookOnlineCourse, requiredOrderList, deductionList, req.user.id, currentTime)
  if (!registrationInsertId) {
    req.flash('errorMessage', '預約失敗')
    return res.redirect('back')
  }
  req.flash('successMessage', '預約成功')
  return res.redirect('back')
}




const renderLivePage = async (req, res) => {
  // 測試網址
  // http://localhost:3000/todayYoga/live?courseDetailId=1
  const { studioSubdomain } = req.params
  const courseDetailId = req.query.courseDetailId
  const userId = req.user.id

  // 撈出課程資料（確認該堂課是不是該教室的）
  const courseDetail = await StudioAdmin.getCourseDetail(studioSubdomain, courseDetailId)
  if (!courseDetail) {
    return res.redirect('/404.html') // FIXME:
  }


  // 檢查登入者有沒有註冊此課程
  const verifyRegistration = await Studio.verifyRegistration(userId, courseDetailId, studioSubdomain)
  if (!verifyRegistration) {
    req.flash('errorMessage', 'Permission denied: 未註冊此課程')
    return res.redirect('/')
  }

  res.render('studio/livestream', {
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
  renderLivePage,
  renderCheckoutPage,
  checkout,
  registerCourse
}

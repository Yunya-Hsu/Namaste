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
  const { studioName } = req.params

  res.send(`<h1 style="color: pink">This is ${studioName} course page</h1>`)
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
  checkout
}

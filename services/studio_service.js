const StudioModel = require('../models/studio_model')
const { currentTime } = require('./all_service')

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
  }

  async getDataForHomePage () {
    const theStudio = await StudioModel.getStudioForHomePage(this.subdomain)
    if (!theStudio) {
      return
    }
    this.organizeData(theStudio)
  }

  async getStudioBySubdomain () {
    const theStudio = await StudioModel.getStudioBySubdomain(this.subdomain)
    if (!theStudio) {
      return
    }
    this.organizeData(theStudio)
  }

  async getPriceRules () {
    const time = currentTime()
    return await StudioModel.getPriceRules(this.id, time)
  }

}

const checkoutInput = () => {

}

module.exports = {
  StudioDetail,
  checkoutInput
}
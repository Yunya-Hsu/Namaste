// utils
const uploadS3 = require('../util/s3')


const photoToS3 = async (req, res, next) => {
  if (req.files.logo) {
    req.body.logo = await uploadS3(req.files.logo[0].path)
  }
  if (req.files.introduction_photo) {
    req.body.introduction_photo = await uploadS3(req.files.introduction_photo[0].path)
  }
  if (req.files.avatar) {
    req.body.avatar = await uploadS3(req.files.avatar[0].path)
  }
  next()
}

module.exports = photoToS3
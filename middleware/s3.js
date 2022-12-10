// utils
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const uploadFileToS3 = require('../util/s3')



const avatarToS3 = async (req, res, next) => {
  if (!req.files.avatar) {
    return next()
  }

  const avatarOnS3 = await uploadFileToS3(req.files.avatar[0].path)
  req.body.avatar = avatarOnS3.key
  await unlinkFile(req.files.avatar[0].path)
  next()
}

module.exports = {
  avatarToS3
}
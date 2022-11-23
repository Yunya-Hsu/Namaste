const multer = require('multer')
const moment = require('moment-timezone')

const fileSizeLimit = 1048576 // 1048576 bytes = 1 MB
const acceptedFileType = ['image/jpg', 'image/jpeg', 'image/png']

const generateFileName = file => {
  const date = moment().tz('Asia/Taipei').format('YYYY-MM-DD')
  const time = moment().tz('Asia/Taipei').format('HH:mm:ss.SSS')
  let organizedFileName = date + '_' + time + '_' + file.originalname
  organizedFileName = organizedFileName.replace(/\s*/g, '')
  return organizedFileName
}

const storage = multer.diskStorage({
  // 設定檔案的儲存位置
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  // 設定檔案命名方式
  filename: (req, file, cb) => {
    cb(null, generateFileName(file))
  }
})

const multerFilter = (req, file, cb) => {
  if (!acceptedFileType.includes(file.mimetype)) {
    return cb(new Error('Please upload picture with jpg, jpeg, png'))
  }
  cb(null, true)
}

const upload = multer({
  fileFilter: multerFilter,
  limit: { fileSizeLimit },
  storage
})

module.exports = upload

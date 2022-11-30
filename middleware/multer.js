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
  const fileSize = parseInt(req.headers['content-length'])
  if (!acceptedFileType.includes(file.mimetype)) {
    req.fileValidationError = '圖片檔案格式錯誤，僅限 jpg, jpeg, png 檔'
    return cb(null, false, new Error('圖片檔案格式錯誤，僅限 jpg, jpeg, png 檔'))
  } else if (fileSize > fileSizeLimit) {
    req.fileValidationError = '圖片過大，僅限 1 MB'
    return cb(null, false, new Error('圖片過大，僅限 1 MB'))
  }
  cb(null, true)
}

const upload = multer({
  fileFilter: multerFilter,
  limit: { fileSize: fileSizeLimit },
  storage
})

const multerError = (req, res, next) => {
  if (req.fileValidationError) {
    req.flash('errorMessage', req.fileValidationError)
    return res.redirect('back')
  }
  next()
}

module.exports = {
  upload,
  multerError
}

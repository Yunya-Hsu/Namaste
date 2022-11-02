const multer = require('multer')
const moment = require('moment')

const fileSizeLimit = 1048576 // 1048576 bytes = 1 MB
const acceptedFileType = ['image/jpg', 'image/jpeg', 'image/png']

const storage = multer.diskStorage({
  // 設定檔案的儲存位置
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  // 設定檔案命名方式
  filename: (req, file, cb) => {
    cb(null, moment().format() + '_' + file.originalname)
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

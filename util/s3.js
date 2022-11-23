const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const S3 = require('aws-sdk/clients/s3') // 注意 S3 需為大寫
const fs = require('fs')
const mime = require('mime')

const s3 = new S3({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  }
})

// uploads image to S3
const uploadFileToS3 = file => {
  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME, // upload images to where
    Body: fs.createReadStream(file), // 檔案本身
    Key: file,
    ContentType: mime.getType(file)
  }

  return s3.upload(uploadParams).promise()
}


module.exports = {
  uploadFileToS3
}

const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination : function (req,file,cb){
    cb(null,'uploads/cities')
  },
  filename : function (req,file,cb){
    let name = path.extname(file.originalname)
    cb(null,Date.now() + name)
  }
})

const uploadSingleImage = multer({
  storage : storage
})

module.exports = uploadSingleImage
const express = require('express')
const { jwtUserAuth } = require('../../middleware/auth')
const userAboutReadmore = require('../../controller/user/about.readmore')

const user_readmoreBlog = express.Router()


user_readmoreBlog.get('/readmoreAbout' , jwtUserAuth , userAboutReadmore.uerAuth , 
userAboutReadmore.aboutReadMore )


module.exports = user_readmoreBlog
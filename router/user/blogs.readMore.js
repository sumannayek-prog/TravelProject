const express = require('express')
const userBlogsReadmore = require('../../controller/user/blogs.readmore')
const { jwtUserAuth } = require('../../middleware/auth')
const user_readmoreAbout = express.Router()


user_readmoreAbout.get('/readmoreblog:id' , jwtUserAuth , userBlogsReadmore.uerAuth ,userBlogsReadmore.blogReadMore )


module.exports = user_readmoreAbout
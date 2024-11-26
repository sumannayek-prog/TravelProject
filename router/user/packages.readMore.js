const express = require('express')
const userPackagesReadmore = require('../../controller/user/user.packages.readmore')
const { jwtUserAuth } = require('../../middleware/auth')
const user_readmore = express.Router()


user_readmore.get('/readmorepack:id' , jwtUserAuth, userPackagesReadmore.uerAuth,userPackagesReadmore.packagesReadMore)


module.exports = user_readmore
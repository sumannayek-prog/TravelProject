const express = require('express')
const userController = require('../../controller/user/user.controller')
const { jwtUserAuth } = require('../../middleware/auth')
const user_route = express.Router()

//***********************************All Pages*******************************************//
user_route.get('/' , jwtUserAuth, userController.uerAuth, userController.indexPage)
user_route.get('/about' , jwtUserAuth, userController.uerAuth, userController.aboutPage)
user_route.get('/blog' , jwtUserAuth,userController.uerAuth, userController.blogPage)
user_route.get('/booking' , jwtUserAuth, userController.uerAuth, userController.bookingPage)
user_route.get('/deletebooking:id' , jwtUserAuth, userController.uerAuth, userController.bookingDelete)
user_route.post('/bookingcreate' , jwtUserAuth, userController.uerAuth, userController.bookingCreate)
user_route.get('/contact' , jwtUserAuth, userController.uerAuth, userController.contactPage)
user_route.post('/contactcreate' , jwtUserAuth, userController.uerAuth, userController.contactCreate)
user_route.get('/destination' , jwtUserAuth, userController.uerAuth, userController.destinationPage)
user_route.get('/guides' , jwtUserAuth, userController.uerAuth, userController.guidesPage)
user_route.get('/packages' , jwtUserAuth, userController.uerAuth, userController.packagesPage)
user_route.get('/testimonial' , jwtUserAuth, userController.uerAuth, userController.testimonialPage)
user_route.get('/services' , jwtUserAuth, userController.uerAuth, userController.servicesPage)
user_route.get('/error' , jwtUserAuth, userController.uerAuth, userController.errorPage)
user_route.get('/dashboard' , jwtUserAuth, userController.uerAuth, userController.dashboardPage)
user_route.get('/search' , jwtUserAuth, userController.uerAuth, userController.searchPage)




//********************************** User Register & Login **********************************//
user_route.get('/register' , userController.userRegister)
user_route.post('/register/user/post' , userController.userRegisterPost)
user_route.get('/login' , userController.userLogin)
user_route.post('/login/user/post' , userController.userLoginPost)
user_route.get('/confirmation/:email/:token' , userController.confirmation)
user_route.get('/logout' , jwtUserAuth, userController.uerAuth, userController.userLogout)
user_route.get('/forgetpassword' , userController.userforgetpassword)
user_route.post('/forgetpasswordpost' , userController.userforgetpasswordpost)
user_route.get('/updatepassword' , jwtUserAuth, userController.uerAuth,userController.userupdatepassword)
user_route.post('/updatepasswordpost:id' , userController.userupdatepasswordpost)


module.exports = user_route

const express = require('express')
const adminController = require('../../controller/admin/controller')
const { jwtAdminAuth } = require('../../middleware/auth')
const admin_router = express.Router()

admin_router.get('/register' , adminController.adminRegister)
admin_router.post('/register/admin/post' , adminController.adminRegisterPost)
admin_router.get('/confirmation/:email/:token' , adminController.confirmations)
admin_router.get('/login' , adminController.adminLogin)
admin_router.post('/login/admin/post' , adminController.adminLoginPost)
admin_router.get('/logout' , adminController.adminLogout)
admin_router.get('/updatepassword:id' , jwtAdminAuth, adminController.adminAuth,adminController.adminUpdatePassword)
admin_router.post('/updatepasswordpost:id' , jwtAdminAuth, adminController.adminAuth,adminController.adminUpdatePasswordPost)
admin_router.get('/forgetpassword' , adminController.adminforgetpassword)
admin_router.post('/forgetpasswordpost' , adminController.adminforgetpasswordpost)

admin_router.get('/dashboard' , jwtAdminAuth, adminController.adminAuth, adminController.adminDashboard)

module.exports = admin_router
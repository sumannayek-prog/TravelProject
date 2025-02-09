const express = require('express')
const admin_guide = express.Router()
const adminGuideController = require('../../controller/admin/guide.controller')
const { jwtAdminAuth } = require('../../middleware/auth')
const uploadImage = require('../../utils/uploadImagesGuide')


admin_guide.get('/guide' , jwtAdminAuth , adminGuideController.adminAuth , adminGuideController.adminGuide)

admin_guide.get('/addguide' , jwtAdminAuth , adminGuideController.adminAuth , adminGuideController.adminAddGuide)

admin_guide.post('/guide/create' ,  jwtAdminAuth , adminGuideController.adminAuth,
uploadImage.single('image'),adminGuideController.adminCreateGuide)

admin_guide.get('/showguide' , jwtAdminAuth , adminGuideController.adminAuth , adminGuideController.adminShowGuide)

admin_guide.get('/activeguide:id' , jwtAdminAuth, adminGuideController.adminAuth,adminGuideController.activeGuide)

admin_guide.get('/deactiveguide:id' , jwtAdminAuth, adminGuideController.adminAuth,adminGuideController.deactiveGuide)

admin_guide.get('/deleteguide:id' , jwtAdminAuth, adminGuideController.adminAuth,adminGuideController.adminDeleteGuide)

module.exports = admin_guide
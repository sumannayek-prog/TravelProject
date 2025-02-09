const express = require('express')
const { jwtAdminAuth } = require('../../middleware/auth')
const { adminAuth} = require('../../controller/admin/services.controller')
const adminServicesController = require('../../controller/admin/services.controller')
const admin_service = express.Router()
const uploadImage = require('../../utils/uploadImagesService')

admin_service.get('/service' , jwtAdminAuth, adminAuth,adminServicesController.adminService)
admin_service.get('/addService' , jwtAdminAuth, adminAuth,adminServicesController.adminAddService)
admin_service.post('/createService' , jwtAdminAuth, adminAuth,uploadImage.single('image'),adminServicesController.adminCreateService)
admin_service.get('/editservice:id' , jwtAdminAuth, adminAuth, adminServicesController.editService)
admin_service.post('/updateservice:id' , jwtAdminAuth, adminAuth, uploadImage.single('image'),adminServicesController.updateService)
admin_service.get('/deleteservice:id' , jwtAdminAuth, adminAuth, adminServicesController.deleteService)
admin_service.get('/activeservice:id' , jwtAdminAuth, adminAuth, adminServicesController.activeThumpsService)
admin_service.get('/deactiveservice:id' , jwtAdminAuth, adminAuth, adminServicesController.deactiveThumpsService)



module.exports = admin_service
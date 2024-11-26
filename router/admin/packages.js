const express = require('express')
const adminPackagesController = require('../../controller/admin/packages.controller')
const { jwtAdminAuth } = require('../../middleware/auth')
const admin_packages = express.Router()
const uploadImage = require('../../utils/uploadImagesPackages')


admin_packages.get('/packages' , jwtAdminAuth, adminPackagesController.adminAuth, adminPackagesController.adminPackages)
admin_packages.get('/addPackages' , jwtAdminAuth, adminPackagesController.adminAuth, adminPackagesController.adminAddPackages)
admin_packages.post('/createPackages' , jwtAdminAuth, adminPackagesController.adminAuth, uploadImage.single('image'),adminPackagesController.adminCreatePackages)
admin_packages.get('/editpackages:id' , jwtAdminAuth, adminPackagesController.adminAuth,adminPackagesController.editPackages)
admin_packages.post('/updatepackages:id' , jwtAdminAuth, adminPackagesController.adminAuth, uploadImage.single('image'),adminPackagesController.updatePackages)
admin_packages.get('/deletepackages:id' , jwtAdminAuth, adminPackagesController.adminAuth,adminPackagesController.deletePackages)
admin_packages.get('/activepackages:id' , jwtAdminAuth, adminPackagesController.adminAuth, adminPackagesController.activePackages)
admin_packages.get('/deactivepackages:id' , jwtAdminAuth, adminPackagesController.adminAuth, adminPackagesController.deactivePackages)



module.exports = admin_packages
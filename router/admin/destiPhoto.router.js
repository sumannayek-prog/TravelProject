const express  = require('express')
const { jwtAdminAuth } = require('../../middleware/auth')
const { adminAuth } = require('../../controller/admin/destinations.controller')
const adminDestiPhoto = require('../../controller/admin/destiPhoto')
const uploadImages = require('../../utils/uploadImagesDestPht')


const admin_destPhoto = express.Router()

admin_destPhoto.get('/destiphoto' , jwtAdminAuth, adminAuth, adminDestiPhoto.Destiphoto)
admin_destPhoto.get('/adddestphoto' , jwtAdminAuth, adminAuth, adminDestiPhoto.addDestiphoto)
admin_destPhoto.post('/createdestphoto' , jwtAdminAuth, adminAuth, uploadImages.array('image',6),adminDestiPhoto.createDestiphoto)
admin_destPhoto.get('/deldestph:id' , jwtAdminAuth, adminAuth, adminDestiPhoto.deleteDestiphoto)
admin_destPhoto.get('/activeph:id' , jwtAdminAuth, adminAuth, adminDestiPhoto.activeDestiphoto)
admin_destPhoto.get('/deactiveph:id' , jwtAdminAuth, adminAuth, adminDestiPhoto.deactiveDestiphoto)


module.exports = admin_destPhoto
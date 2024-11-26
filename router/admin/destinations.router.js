const express = require('express')
const admin_dest = express.Router()
const { jwtAdminAuth } = require('../../middleware/auth')
const adminDestinationsController = require('../../controller/admin/destinations.controller')
const uploadImage = require('../../utils/uploadImagesDest')

admin_dest.get('/destinations' , jwtAdminAuth, adminDestinationsController.adminAuth,adminDestinationsController.adminDestination)

admin_dest.get('/addDestination' , jwtAdminAuth, adminDestinationsController.adminAuth,adminDestinationsController.adminAddDestination)

admin_dest.post('/createDest' , jwtAdminAuth, adminDestinationsController.adminAuth,
uploadImage.single('image'),adminDestinationsController.adminCreateDestination)

admin_dest.get('/editDest:id' , jwtAdminAuth, adminDestinationsController.adminAuth,adminDestinationsController.adminEditDestination)

admin_dest.post('/updatedest:id' , jwtAdminAuth, adminDestinationsController.adminAuth,
uploadImage.single('image'),adminDestinationsController.adminUpdateDestination)

admin_dest.get('/deleteDest:id' , jwtAdminAuth, adminDestinationsController.adminAuth,adminDestinationsController.adminDeleteDestination)

admin_dest.get('/thumpsdowndest:id' , jwtAdminAuth, adminDestinationsController.adminAuth,adminDestinationsController.adminDeactiveDestination)

admin_dest.get('/thumpsupdest:id' , jwtAdminAuth, adminDestinationsController.adminAuth,adminDestinationsController.adminActiveDestination)



module.exports = admin_dest

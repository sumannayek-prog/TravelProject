const express = require('express')
const adminBookingController = require('../../controller/admin/booking.controller')
const { jwtAdminAuth } = require('../../middleware/auth')
const admin_booking = express.Router()

admin_booking.get('/booking' , jwtAdminAuth, adminBookingController.adminAuth,adminBookingController.adminbookingPage)

admin_booking.get('/deletebooking:id' , jwtAdminAuth, adminBookingController.adminAuth,adminBookingController.deletebooking)

admin_booking.get('/activebooking:id' , jwtAdminAuth, adminBookingController.adminAuth,adminBookingController.activebooking)

admin_booking.get('/deactivebooking:id' , jwtAdminAuth, adminBookingController.adminAuth,adminBookingController.deactivebooking)


module.exports = admin_booking
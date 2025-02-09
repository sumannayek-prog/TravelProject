const express = require('express')
const admin_testimonial = express.Router()
const adminTestimonialController = require('../../controller/admin/testimonial.controller')
const { jwtAdminAuth } = require('../../middleware/auth')
const uploadImages = require('../../utils/uploadImagesTestimonial')


admin_testimonial.get('/testimonial' , jwtAdminAuth , adminTestimonialController.adminAuth,adminTestimonialController.adminTestimonial)

admin_testimonial.get('/testimonial/show' , jwtAdminAuth , adminTestimonialController.adminAuth,adminTestimonialController.adminShowTestimonial)

admin_testimonial.get('/addtestimonial' , jwtAdminAuth , adminTestimonialController.adminAuth,adminTestimonialController.adminAddTestimonial)

admin_testimonial.post('/testimonial/create' , jwtAdminAuth , adminTestimonialController.adminAuth,uploadImages.single('image'),adminTestimonialController.adminCreateTestimonial)

admin_testimonial.get('/deletetest:id' , jwtAdminAuth , adminTestimonialController.adminAuth,adminTestimonialController.adminDeleteTestimonial)

admin_testimonial.get('/activetest:id' , jwtAdminAuth, adminTestimonialController.adminAuth,adminTestimonialController.activetest)

admin_testimonial.get('/deactivetest:id' , jwtAdminAuth, adminTestimonialController.adminAuth,adminTestimonialController.deactivetest)


module.exports = admin_testimonial
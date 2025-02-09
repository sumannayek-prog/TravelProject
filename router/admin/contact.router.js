const express = require('express')
const adminContactController = require('../../controller/admin/contact.controller')
const { jwtAdminAuth } = require('../../middleware/auth')
const admin_contact = express.Router()

admin_contact.get('/contact' , jwtAdminAuth , adminContactController.adminAuth , adminContactController.adminContactPage)

admin_contact.get('/showcontactpage' , jwtAdminAuth , adminContactController.adminAuth , adminContactController.adminShowPage)

admin_contact.get('/deletecon:id' , jwtAdminAuth , adminContactController.adminAuth , adminContactController.adminDeletePage)

admin_contact.get('/activec:id' , jwtAdminAuth , adminContactController.adminAuth , adminContactController.adminActivePage)

admin_contact.get('/deactivec:id' , jwtAdminAuth , adminContactController.adminAuth , adminContactController.adminDeactivePage)


module.exports = admin_contact
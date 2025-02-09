const express = require('express')
const { jwtAdminAuth } = require('../../middleware/auth')
const { adminAuth } = require('../../controller/admin/cities.controller')
const adminCitiesController = require('../../controller/admin/cities.controller')
const uploadImage = require('../../utils/uploadImagesCities')

const admin_cities = express.Router()

admin_cities.get('/cities', jwtAdminAuth , adminAuth , adminCitiesController.adminCitiesGet)
admin_cities.get('/addcities', jwtAdminAuth , adminAuth , adminCitiesController.adminaddCities)
admin_cities.post('/createcities', jwtAdminAuth , adminAuth , uploadImage.single('image'),adminCitiesController.createcities)
admin_cities.get('/showcitypage', jwtAdminAuth , adminAuth , adminCitiesController.adminShowCities)
admin_cities.get('/deletect:id', jwtAdminAuth , adminAuth , adminCitiesController.adminDeleteCities)
admin_cities.get('/activect:id', jwtAdminAuth , adminAuth , adminCitiesController.adminActiveCities)
admin_cities.get('/deactivect:id', jwtAdminAuth , adminAuth , adminCitiesController.adminDeactiveCities)

module.exports = admin_cities
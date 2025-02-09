const express = require('express')
const citiesPageController = require('../../controller/user/cities.controller')
const { jwtUserAuth } = require('../../middleware/auth')
const user_cities = express.Router()

user_cities.get('/cities' ,jwtUserAuth, citiesPageController.uerAuth,citiesPageController.citiesPage)
user_cities.get('/citiespageUsa' ,jwtUserAuth,  citiesPageController.uerAuth,citiesPageController.citiesPageUsa)
user_cities.get('/citiespageCan' ,jwtUserAuth,  citiesPageController.uerAuth,citiesPageController.citiesPageCan)
user_cities.get('/citiespageEur' ,jwtUserAuth,  citiesPageController.uerAuth,citiesPageController.citiesPageEur)
user_cities.get('/citiespageChi' ,jwtUserAuth,  citiesPageController.uerAuth,citiesPageController.citiesPageChi)
user_cities.get('/citiespageSingp' ,jwtUserAuth,  citiesPageController.uerAuth,citiesPageController.citiesPageSingp)
user_cities.get('/confirmbook:id' ,jwtUserAuth,  citiesPageController.uerAuth,citiesPageController.citiesConfirmBook)
user_cities.post('/confirmbookpost' ,jwtUserAuth,  citiesPageController.uerAuth,citiesPageController.citiesConfirmBookpost)


module.exports = user_cities
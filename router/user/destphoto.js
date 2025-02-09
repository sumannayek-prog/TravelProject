const express = require('express')
const user_destphoto = express.Router()
const { jwtUserAuth } = require('../../middleware/auth')
const userDestphotoController = require('../../controller/user/destphoto.controller')


user_destphoto.get('/viewDestPhotousa' ,jwtUserAuth, userDestphotoController.uerAuth, userDestphotoController.getDestPhotosUSA)

user_destphoto.get('/viewDestPhotocan' ,jwtUserAuth, userDestphotoController.uerAuth, userDestphotoController.getDestPhotosCAN)

user_destphoto.get('/viewDestPhotochina' ,jwtUserAuth, userDestphotoController.uerAuth, userDestphotoController.getDestPhotosCHINA)

user_destphoto.get('/viewDestPhotosing' ,jwtUserAuth, userDestphotoController.uerAuth, userDestphotoController.getDestPhotosSING)

user_destphoto.get('/viewDestPhotoeuo' ,jwtUserAuth, userDestphotoController.uerAuth, userDestphotoController.getDestPhotosEUO)


module.exports = user_destphoto
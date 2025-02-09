const express = require('express')
require('dotenv').config()
const connectToMongoDB = require('./config/dataBase')
const bodyParser = require('body-parser')
const server = express()
const session = require('express-session')
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const ejs = require('ejs')
const path = require('path')
connectToMongoDB()

// ejs setup
server.set('view engine' , 'ejs')
server.set('views' , 'views')

server.use(flash())

server.use(session({
  secret : 'secret',
  cookie : { maxAge : 600000},
  resave : false,
  saveUninitialized : false,
}))

server.use(cookieParser())

server.use(bodyParser.json({limit: "50mb"}))
server.use(bodyParser.urlencoded({limit: "50mb",extended: true,parameterLimit: 50000}))

server.use(express.static(path.join(__dirname, 'public')))
server.use('/uploads',express.static('uploads'))

const userRouter = require('./router/user/user.router')
server.use(userRouter)
const userDestPhoto = require('./router/user/destphoto')
server.use(userDestPhoto)
const userBooking = require('./router/user/user.router')
server.use(userBooking)
const userCities = require('./router/user/cities.router')
server.use(userCities)
const adminBooking = require('./router/admin/booking.router')
server.use('/admin',adminBooking)
const adminRouter = require('./router/admin/admin.router')
server.use('/admin',adminRouter)
const adminCitiesRouter = require('./router/admin/cities.router')
server.use('/admin',adminCitiesRouter)
const adminBannerRouter = require('./router/admin/banner.router')
server.use('/admin',adminBannerRouter)
const adminServiceRouter = require('./router/admin/service.router')
server.use('/admin',adminServiceRouter)
const adminPackagesRouter = require('./router/admin/packages')
server.use('/admin',adminPackagesRouter)
const adminContactRouter = require('./router/admin/contact.router')
server.use('/admin',adminContactRouter)
const adminBlogRouter = require('./router/admin/blog.router')
server.use('/admin',adminBlogRouter)
const adminDestRouter = require('./router/admin/destinations.router')
server.use('/admin',adminDestRouter)
const adminDestPhotoRouter = require('./router/admin/destiPhoto.router')
server.use('/admin',adminDestPhotoRouter)
const adminTestimonialRouter = require('./router/admin/testimonial.router')
server.use('/admin',adminTestimonialRouter)
const adminGuideRouter = require('./router/admin/guide.router')
server.use('/admin',adminGuideRouter)


const port = 5499
server.listen(port, ()=>{
  console.log(`Server is running on-> http://localhost:${port}`);
})
//Hello everyone
const { hashpassword, comparepassword } = require('../../middleware/auth')
const userModel = require('../../model/user/user.model')
const jwt = require('jsonwebtoken')
const crypto = require("crypto");
const tokenModel = require("../../model/user/tokenModel");
const middleware = require('../../middleware/auth')

const adminBannerModel = require('../../model/admin/banner.model')
const adminServiceModel = require('../../model/admin/services.model')
const adminPackagesModel = require('../../model/admin/packages.model')
const adminBlogModel = require('../../model/admin/blog.model')
const adminDestinationModel = require('../../model/admin/destination.model')
const adminDestiPhotoModel = require('../../model/admin/destination_sub.model')
const adminTestimonialModel = require('../../model/admin/testimonial.model')
const adminGuideSchema = require('../../model/admin/guide.model')
const adminCitiesModel = require('../../model/admin/cities.model')

const userContactModel = require('../../model/user/user.contact')
const userBookingModel = require('../../model/user/user.booking')




class UserController{
    
    indexPage = async (req,res)=>{
      try {      
        const allBannerData = await adminBannerModel.find()
        const allServiceData = await adminServiceModel.find()
        const allPackagesData = await adminPackagesModel.find()
        const allBlogs = await adminBlogModel.find()
        const allDestinations = await adminDestinationModel.find()
        const allDestph = await adminDestiPhotoModel.find()
        const allTest = await adminTestimonialModel.find()
        const allGuide = await adminGuideSchema.find() 
      res.render('user/index',{
        data : req.user,
        allBannerdata : allBannerData,
        allServicedata : allServiceData,
        allPackagesdata : allPackagesData,
        allblogs : allBlogs,
        alldestinations  : allDestinations,
        alldestph  : allDestph,
        alltest: allTest, 
        allguide: allGuide
      })
      } catch (error) {
        console.log(error);
      }      
    }

    searchPage = async (req,res)=>{
      try {
        var search = '';
        if(req.query.search){
          search = req.query.search
        }
        const allBannerData = await adminBannerModel.find()
        const allServiceData = await adminServiceModel.find()
        const allPackagesData = await adminPackagesModel.find()
        const allBlogs = await adminBlogModel.find()
        const allDestph = await adminDestiPhotoModel.find()
        const allTest = await adminTestimonialModel.find()
        const allGuide = await adminGuideSchema.find() 
        const allDestinations = await adminDestinationModel.find({
          $or : [
            {country : {$regex : '.*'+search+'.*',$options : 'i'}},
            {destination : {$regex : '.*'+search+'.*',$options : 'i'}}
          ]
        })
        res.render('user/search',{
          alldestinations  : allDestinations,
          data : req.user,
          allBannerdata : allBannerData,
          allServicedata : allServiceData,
          allPackagesdata : allPackagesData,
          allblogs : allBlogs,
          alldestinations  : allDestinations,
          alldestph  : allDestph,
          alltest: allTest, 
          allguide: allGuide
        })
      } catch (error) {
        console.log(error);
      }
    }

    aboutPage = async (req,res)=>{
      res.render('user/about',{
        data : req.user
      })
    }

    blogPage = async (req,res)=>{
      const allBlogs = await adminBlogModel.find()
      res.render('user/blog',{
        data : req.user,
        allblogs : allBlogs,
      })
    }

    bookingPage = async (req,res)=>{
      res.render('user/booking',{
        data : req.user,
        error_msg : req.flash('error_msg', "Something went wrong"),
        success_msg : req.flash('success_msg', "Message sent to Admin, please wait for confirmation")
      })
    }

    contactPage = async (req,res)=>{
      res.render('user/contact',{
        data : req.user
      })
    }

    guidesPage = async (req,res)=>{
      const allGuide = await adminGuideSchema.find()       
      res.render('user/guides',{
        data : req.user,
        allguide: allGuide
      })
    }

    destinationPage = async (req,res)=>{
      const allDestinations = await adminDestinationModel.find()
      const allDestph = await adminDestiPhotoModel.find()
      const allGuide = await adminGuideSchema.find() 
      res.render('user/destination',{
        data : req.user,
        alldestinations  : allDestinations,
        alldestph  : allDestph,
        allguide: allGuide
      })
    }

    destiphoto = async (req,res)=>{
      const allDestph = await adminDestiPhotoModel.find()
      const allGuide = await adminGuideSchema.find() 
      res.render('user/viewDestPhoto',{
        data : req.user,
        alldestph  : allDestph,
        allguide: allGuide
      })
    }

    packagesPage = async (req,res)=>{
      const allPackagesData = await adminPackagesModel.find()    
      res.render('user/packages',{
        data : req.user,
        allPackagesdata : allPackagesData
      })
    }
    
    servicesPage = async (req,res)=>{
      const allServiceData = await adminServiceModel.find()
      res.render('user/services',{
        data : req.user,
        allServicedata : allServiceData
      })
    }

    testimonialPage = async (req,res)=>{
      const allTest = await adminTestimonialModel.find()
      res.render('user/testimonial',{
        data : req.user,
        alltest: allTest,  
      })
    } 

    errorPage = async (req,res)=>{
      res.render('user/error',{
        data : req.user
      })
    }  

    dashboardPage = async (req,res)=>{
      const allBookingData = await userBookingModel.find()
      res.render('user/dashboard',{
        data : req.user,
        error_msg : req.flash('error_msg'),
        success_msg : req.flash('success_msg'),
        allBookingdata : allBookingData        
      })
    }

    bookingDelete = async(req,res)=>{
      try {
        const id = req.params.id
        const deleteBook = await userBookingModel.findByIdAndDelete(id)
        if(deleteBook){
          req.flash('error_msg' , 'Successfully Deleted!!!')
          res.redirect('/dashboard')
        }
      } catch (error) {
        console.log(error);
      }
    }   

    userforgetpassword = (req,res)=>{
      res.render('user/forgetpassword')
    }

    userRegister = (req,res)=>{
      res.render('user/register',{
      error_msg : req.flash('error_msg')
      })
    }

    userRegisterPost = async (req,res)=>{
      try {
        const {usernameValue,emailValue,phoneValue,passwordValue} = req.body
        const user = await userModel.findOne({email : emailValue})
        if(user){
        console.log('Email already registered');
        req.flash('error_msg' , 'Email already registered')
        res.redirect('/register')
        // return res.status(404).json({status : false, message : 'Email already registered'})        

      }    
        const hashedpassword = await hashpassword(passwordValue)
        const newUser = new userModel({
        name : usernameValue,
        email : emailValue,
        phone : phoneValue,
        password : hashedpassword,
      })
      const allUser = await newUser.save()
      if(allUser){        
      const token_model = new tokenModel({
            _userId: allUser._id,
            token : crypto.randomBytes(16).toString('hex')
        })
      const token = await token_model.save()
        if(token){
            const senderEmail = "sumannayek172@gmail.com";
                    const password= "bmie gfdk fagn tiok";
                    var transporter  = middleware.transport(senderEmail,password)
                    var mailoptions = {
                        from: 'default@gmail.com',
                        to: allUser.email,
                        subject: 'Account Verification',
                        text: 'Hello ' + req.body.name + ',\n\n' + 'Please verify your account by clicking the link: '+'\nhttp:\/\/' + req.headers.host + '\/confirmation\/' + allUser.email + '\/' + token.token + '\n\nThank You!\n'
                    }
        }
        middleware.mailSender(req,res,transporter,mailoptions);
      }
      } catch (error) {
        console.log("Failed to register",error);           
      }
    }

    confirmation = async (req,res)=>{
      try {
          const token = await tokenModel.findOne({token : req.params.token})
          if(!token){
              console.log("verification link may be expired");
          }else{
              const user = await userModel.findOne({_id : token._userId, email : req.params.email})
              if(!user){
                  console.log("User not found");
                  return res.redirect("/register")
              }else if(user.isVerified){
                  console.log('user is already verified');
              }else{
                  user.isVerified = true
                  const result = await user.save()
                  if(result){
                      console.log('user verifed successFully', result);
                      req.flash('error_msg' , 'User verified successfull!!')
                      res.redirect("/login")
                  }
              }
          }
      } catch (error) {
          console.log("error while finding token",error);
          
      }
    }

    userLogin = (req,res)=>{
      res.render('user/login',{
        error_msg : req.flash('error_msg')
      })
    }

    userLoginPost = async (req,res)=>{
      try {
        const {email,password} = req.body
        if(!(email || password)){
          console.log('Input field required');
          req.flash('error_msg' , 'All input field required!!')
          return res.redirect('/login')
        }
        const user = await userModel.findOne({email})
        if(!user){
          console.log('Email not registered');
          req.flash('error_msg' , 'Email not registered!!')
          res.redirect('/login')
        }
        if(user.status !== 'user'){
          req.flash('error_msg' , "You are not authorised to login")
          console.log('You are not authorised to login');
          res.redirect('/login')
        }        
        const comparedpassword = await comparepassword(password, user.password)
        if(!comparedpassword){
          req.flash('error_msg' , "Password incorrect")
          console.log('Password incorrect');
          res.redirect('/login')
        }
        const token = jwt.sign({
          _id : user._id,
          name : user.name,
          email : user.email,
          status : user.status
        },process.env.SECRET_KEY,{expiresIn:'12h'})
        if(token){
          req.flash('success_msg' , "Successfully Login")
          res.cookie('userToken', token)
          res.redirect('/')
        }
      } catch (error) {
        console.log(error);
      
      }
    }

    userLogout = (req,res)=>{
      res.clearCookie('userToken')
      res.redirect('/login')
    }


   


    uerAuth = (req,res,next)=>{
      if(req.user){
        next()
      }else{
        res.redirect('/login')
      }
    }

    userforgetpasswordpost = async (req,res)=>{
      try {
        const {name,email,newPassword} = req.body
      if(!(name && email)){
        req.flash('error_msg' , 'All input field required!!')
        return res.redirect('/forgetpassword')
      }
      const user = await userModel.findOne({name,email})
      if(!user){
        console.log('Name or email not matched');
        req.flash('error_msg' , 'Incorrect Name or Email!!')
        return res.redirect('/forgetpassword')
      }
      const hashedpassword = await hashpassword(newPassword)
      const updateUser = await userModel.findByIdAndUpdate({_id: user._id},{
        password : hashedpassword
      })
      if(updateUser){
        req.flash('success_msg' , "Password reset successfully")
        console.log('Password reset successfully');
        res.redirect('/login')
      }
      
      } catch (error) {
        console.log(error);
        return res.redirect('/forgetpassword')
      }
      
    }

    userupdatepassword = async(req,res)=>{
      res.render('user/updatepassword',{
        data : req.user
      })
    }

    userupdatepasswordpost = async (req,res)=>{
      try {
        const id = req.params.id
        const {password} = req.body
        const data = await userModel.findById(id)
        if(data){
          const newPwd = await hashpassword(password)
          const userDate = await userModel.findByIdAndUpdate(id,{
            name : req.body.name,
            email : req.body.email,
            password : newPwd
          },{new :true})
          if(userDate){
            req.flash('success_msg' , "Update all details successfully")       
            console.log('Update all details successfully');
            res.redirect('/')
          }
        }else{
          console.log('User Id not found');
        }        
      } catch (error) {
        console.log(error);
        res.redirect("/updatepassword")
      }
    }    

    bookingCreate = async (req,res)=>{
      try {
        const {name,email,phone,location,person,kids,message} = req.body
        const newBooking = new userBookingModel({
          name,email,phone,location,person,kids,message
        })
        const date = new Date();
        
        const allBookingData = await newBooking.save()
        if(allBookingData){
          res.redirect('/dashboard')
          const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
          console.log(formattedDate);
        }
        data : req.user
      } catch (error) {
        console.log(error);
        res.redirect('error')
      }
    }

    contactCreate = async (req,res)=>{
      try {
        const {name,email,subject,message} = req.body
        const newContact = await userContactModel({
          name,email,subject,message
        })
        const allBooking = await newContact.save()
        if(allBooking){
          req.flash('success_msg' , 'Successfully send!!')
          res.redirect('/contact')
          console.log('bb',allBooking)
        }

      } catch (error) {
        console.log(error);
      }
    }


}

module.exports = new UserController()
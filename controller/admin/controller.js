const { hashpassword, comparepassword } = require('../../middleware/auth')
const adminModel = require('../../model/admin/register.model')
const jwt = require('jsonwebtoken')
const crypto = require("crypto");
const tokenModeladmin = require("../../model/admin/tokenModels");
const middleware = require('../../middleware/admin.mail')

class AdminController{

  adminRegister = async(req,res)=>{
    res.render('admin/register',{
      error_msg : req.flash('error_msg'),
      success_msg : req.flash('success_msg'),
      data : req.admin
    })
  }

  adminLogin = (req,res)=>{
    res.render('admin/login',{
      error_msg : req.flash('error_msg'),
      success_msg : req.flash('success_msg'),
      data : req.admin
    })
  }

  adminDashboard = (req,res)=>{
    res.render('admin/dashboard',{
      error_msg : req.flash('error_msg'),
      success_msg : req.flash('success_msg'),
      data : req.admin
    })
  }

  adminUpdatePassword = async(req,res)=>{
    res.render('admin/updatepassword',{
      data : req.admin
    })
  }

  adminforgetpassword = (req,res)=>{
    res.render('admin/forgetpassword')
  }

  adminRegisterPost = async (req,res)=>{
    try {
      const {adminnameValue, adminemailValue, adminphoneValue, adminpasswordValue} = req.body
      console.log(adminnameValue, adminemailValue, adminphoneValue, adminpasswordValue);
      const user = await adminModel.findOne({email : adminemailValue})
      if(user){
      console.log('Email already registered');
      res.redirect('/admin/register')
      req.flash('error_msg' , 'Email already registered')
      // return res.status(404).json({status : false, message : 'Email already registered'})        

    }    
      const hashedpassword = await hashpassword(adminpasswordValue)

      const newAdmin = new adminModel({
      name : adminnameValue,
      email : adminemailValue,
      phone : adminphoneValue,
      password : hashedpassword,
    })
    const allAdmin = await newAdmin.save()
    if(allAdmin){        
      const token_model = new tokenModeladmin({
        _userId: allAdmin._id,
        token : crypto.randomBytes(16).toString('hex')
    })
    const token = await token_model.save()
        if(token){
          const senderEmail = "sumannayek172@gmail.com";
          const password= "bmie gfdk fagn tiok";
                    var transporter  = middleware.transports(senderEmail,password)
                    var mailoptions = {
                        from: 'sumannayek172@gmail.com',
                        to: allAdmin.email,
                        subject: 'Account Verification',
                        text: 'Hello ' + req.body.name + ',\n\n' + 'Please verify your account by clicking the link: '+'\nhttp:\/\/' + req.headers.host +'\/admin'+ '\/confirmation\/' + allAdmin.email + '\/' + token.token + '\n\nThank You!\n'
                    }
        }
        middleware.mailSenders(req,res,transporter,mailoptions);
    }
    } catch (error) {
      console.log("Failed to register",error);           

    }

  }

  confirmations = async (req,res)=>{
    try {
        const token = await tokenModeladmin.findOne({token : req.params.token})
        console.log(token);
        if(!token){
            console.log("verification link may be expired");
        }else{
            const user = await adminModel.findOne({_id : token._userId, email : req.params.email})
            if(!user){
                console.log("User not found");
                return res.redirect("/admin/register")
            }else if(user.isVerified){
                console.log('user is already verified');
            }else{
                user.isVerified = true
                const result = await user.save()
                if(result){
                    console.log('user verifed successFully', result);
                    req.flash('error_msg' , 'Verified successfully!!')
                    return res.redirect("/admin/login")
                }
            }
        }
    } catch (error) {
        console.log("error while finding token",error);
        
    }
  }

  adminLoginPost = async (req,res)=>{
    try {
      const {email,password} = req.body
      if(!(email || password)){
        console.log('Input field required');
        req.flash('error_msg' , 'All input field required!!')
        return res.redirect('/admin/login')
      }
      const user = await adminModel.findOne({email})
      if(!user){
        console.log('Email not registered');
        req.flash('error_msg' , 'Email not registered!!')
        res.redirect('/admin/login')
      }
      if(user.status !== 'admin'){
        req.flash('error_msg' , "You are not authorised to login")
        console.log('You are not authorised to login');
        res.redirect('/admin/login')
      }        
      const comparedpassword = await comparepassword(password, user.password)
      if(!comparedpassword){
        req.flash('error_msg' , "Password incorrect")
        console.log('Password incorrect');
        res.redirect('/admin/login')
      }
      const token = jwt.sign({
        _id : user._id,
        name : user.name,
        email : user.email,
        status : user.status
      },process.env.SECRET_KEY,{expiresIn:'12h'})
      if(token){
        req.flash('success_msg' , "Successfully Login")
        res.cookie('adminToken', token)
        res.redirect('/admin/dashboard')
      }
    } catch (error) {
      console.log(error);
    
    }
  }

  adminLogout = (req,res)=>{
    res.clearCookie('adminToken')
    res.redirect('/admin/login')
  }

  adminUpdatePasswordPost = async (req,res)=>{
    try {
      const id = req.params.id
      const {password} = req.body
      const data = await adminModel.findById(id)
      if(data){
        const newPwd = await hashpassword(password)
        const userDate = await adminModel.findByIdAndUpdate(id,{
          name : req.body.name,
          email : req.body.email,
          password : newPwd
        },{new :true})
        if(userDate){
          req.flash('success_msg' , "Update all details successfully")       
          console.log('Update all details successfully');
          res.redirect('/admin/dashboard')
        }
      }else{
        console.log('User Id not found');
      }        
    } catch (error) {
      console.log(error);
      res.redirect("/admin/updatepassword")
    }
  } 

  adminforgetpasswordpost = async (req,res)=>{
    try {
      const {name,email,newPassword} = req.body
    if(!(name && email)){
      req.flash('error_msg' , 'All input field required!!')
      return res.redirect('/admin/forgetpassword')
    }
    const user = await adminModel.findOne({name,email})
    if(!user){
      console.log('Name or email not matched');
      req.flash('error_msg' , 'Incorrect Name or Email!!')
      return res.redirect('/admin/forgetpassword')
    }
    const hashedpassword = await hashpassword(newPassword)
    const updateUser = await adminModel.findByIdAndUpdate({_id: user._id},{
      password : hashedpassword
    })
    if(updateUser){
      req.flash('success_msg' , "Password reset successfully")
      console.log('Password reset successfully');
      res.redirect('/admin/login')
    }
    
    } catch (error) {
      console.log(error);
      return res.redirect('/admin/forgetpassword')
    }
  }

  adminAuth = (req,res,next)=>{
    if(req.admin){
      next()
    }else{
      res.redirect('/admin/login')
    }
  }

}


module.exports = new AdminController()
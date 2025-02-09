const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");


const hashpassword = async (password)=>{
  try {
    return await bcrypt.hash(password, 10)
  } catch (error) {
    console.log(error);
  }
}

const comparepassword = async (password, hashpassword)=>{
  return bcrypt.compare(password, hashpassword)
}

const jwtUserAuth = (req,res,next)=>{
  if(req.cookies && req.cookies.userToken){
    jwt.verify(req.cookies.userToken, process.env.SECRET_KEY,(err,data)=>{
      req.user = data
      next()
    })
    // console.log('pp',req.user);
  }else{
    console.log('Please login for User');
    next()
  }
}

const jwtAdminAuth = (req,res,next)=>{
  if(req.cookies && req.cookies.adminToken){
    jwt.verify(req.cookies.adminToken, process.env.SECRET_KEY, (err,data)=>{
      req.admin = data
      next()
    })
    // console.log('pp',req.admin)
  }else{
    console.log('Please login for Admin');
    next()
  }
}

const transport = (senderEmail, password) => {
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth:{
        user:senderEmail,
        pass:password,
    }
  });
  return transporter
};

const mailSender =(req,res,trans,mailoptions)=>{
  trans.sendMail(mailoptions,(err)=>{
      if(err){
          console.log("Technical Issue",err);
      }else{
        req.flash('error_msg', "A Verfication Email Sent To Your Mail ID.... Please Verify By Click The Link.... It Will Expire By 24 Hrs...")
        console.log("Verfication Email Sent To Your Mail ID....");        
        return res.redirect("/register")
      }
  })
}


module.exports = {
  hashpassword,
  comparepassword,
  jwtUserAuth,
  jwtAdminAuth,
  transport,
  mailSender
}
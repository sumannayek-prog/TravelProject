const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");

const transports = (senderEmail, password) => {
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

const mailSenders =(req,res,trans,mailoptions)=>{
  trans.sendMail(mailoptions,(err)=>{
      if(err){
          console.log("Technical Issue",err);
      }else{
        console.log("Verfication Email Sent To Your Mail ID....");        
        res.redirect("/admin/register")
        req.flash('error_msg', "A Verfication Email Sent To Your Mail ID.... Please Verify By Click The Link.... It Will Expire By 24 Hrs...")
      }
  })
}


module.exports = {
  transports,
  mailSenders
}
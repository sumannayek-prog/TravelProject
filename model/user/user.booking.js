const mongoose = require('mongoose')

const userBookingModelNew = new mongoose.Schema({

  name : {
    type : String,
    required : true,
  }, 
  email : {
    type : String,
    required : true,
  }, 
  city : {
    type : String,
    required : true,
  },    
  country :{
    type : String,
    required : true,
  },
  guide : {
    type : String,
    required : true,
  },
  hotel : {
    type : String,
    required : true,
  },
  days : {
    type : String,
    required : true,
  },
  adult : {
    type : String,
    required : true,
  },
  kid : {
    type : String,
    required : true,
  },
  amount : {
    type : String,
    required : true,
  },
  food : {
    type : String,
    required : true,
  },
  coupon : {
    type : String,
  },
  status :{
    type : String,
    default : 1,
  }

},{timestamps:true})


module.exports = mongoose.model('userbookingnew' , userBookingModelNew)
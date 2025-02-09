const mongoose = require('mongoose')

const adminRegisterSchema = new mongoose.Schema({

  name : {
    type : String,
    required : true,
  },
  email : {
    type : String,
    required : true,
  },
  phone : {
    type : String,
    required : true,
  },
  password : {
    type : String,
    required : true,
  },
  isVerified:{
    type:Boolean,
    defaut:false,
  },
  status : {
    type : String,
    default : 'admin'
  }

},{timestamps:true})

module.exports = mongoose.model('admin' , adminRegisterSchema)
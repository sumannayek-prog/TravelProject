const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

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
      default : 'user'
    }

},{timestamps:true})

module.exports = mongoose.model('user' , userSchema)
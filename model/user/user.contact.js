const mongoose = require('mongoose')

const userContactModel = new mongoose.Schema({

      name : {
        type : String,
        required : true,
      },
      email : {
        type : String,
        required : true,
      },
      subject : {
        type : String,
        required : true,
      },
      message : {
        type : String,
        required : true,
      },
      status : {
        type : String,
        default : 1
      },
      date : {
        type : Date,
        default : Date.now,
      },

},{timestamps:true})

module.exports = mongoose.model('usercontact' , userContactModel)
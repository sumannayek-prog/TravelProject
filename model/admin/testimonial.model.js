const mongoose = require('mongoose')

const adminTestimonial = new mongoose.Schema({

      para : {
        type : String,
        required : true,
      },
      image : {
        type : String,
        required : true,
      },
      title : {
        type : String,
        required : true,
      },
      sub_title : {
        type : String,
        required : true,
      },
      status : {
        type : String,
        default : 1
      }

},{timestamps:true})

module.exports = mongoose.model('admintestimonial' , adminTestimonial)
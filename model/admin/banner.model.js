const mongoose = require('mongoose')

const adminBannerModel = new mongoose.Schema({

    sub_title : {
      type : String,
      required : true,
    },
    title : {
      type : String,
      required : true,
    },
    sub_head : {
      type : String,
      required : true,
    },
    image : {
      type : String,
      required : true,
    },
    status : {
      type : String,
      default : 1
    }
},{timestamps: true})


module.exports = mongoose.model('adminBanner' , adminBannerModel)
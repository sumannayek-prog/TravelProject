const mongoose = require('mongoose')

const adminServiceModel = new mongoose.Schema({

    title : {
      type : String,
      required : true,
    },
    para : {
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


module.exports = mongoose.model('adminService' , adminServiceModel)
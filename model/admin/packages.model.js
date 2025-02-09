const mongoose = require('mongoose')

const adminPackagesModel = new mongoose.Schema({

    amount : {
      type : String,
      required : true,
    },
    image : {
      type : String,
      required : true,
    },
    location : {
      type : String,
      required : true,
    },
    days : {
      type : String,
      required : true,
    },
    person : {
      type : String,
      required : true,
    },
    title : {
      type : String,
      required : true,
    },
    hotel : {
      type : String,
      required : true,
    },
    para : {
      type : String,
      required : true,
    },
    guide : {
      type : String,
      required : true,
    },
    guideId : {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'adminguide',
    },
    status : {
      type : String,
      default : 1
    }
    
},{timestamps: true})


module.exports = mongoose.model('adminPackages' , adminPackagesModel)
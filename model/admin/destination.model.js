const mongoose = require('mongoose')

const adminDestinationSchema = new mongoose.Schema({

    destination :{
      type : String, // popular
      required : true,
    },
    image :{
      type : String,
      required : true,
    },
    country :{
      type : String, // USA/CANADA
      required : true,
    },
    status :{
      type : String,
      default : 1,
    }

}, {timestamps:true})

module.exports = mongoose.model('adminDestination', adminDestinationSchema)
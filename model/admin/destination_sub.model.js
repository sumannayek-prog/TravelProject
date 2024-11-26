const mongoose = require('mongoose')

const adminSubDestinationSchema = new mongoose.Schema({

    city : {
      type : String,
      required : true,
    },
    image :{
      type : Array,
      required : true,
    },
    country :{
      type : String,
      required : true,
    },
    countryId :{
      type : mongoose.Schema.Types.ObjectId,
      ref : "adminDestination",
    },
    status :{
      type : String,
      default : 1,
    }

}, {timestamps:true})

module.exports = mongoose.model('adminsubDestination', adminSubDestinationSchema)
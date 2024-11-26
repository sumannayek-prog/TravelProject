const mongoose = require('mongoose')

const adminCitiesSchema = new mongoose.Schema({

    
    city : {
      type : String,
      required : true,
    },    
    country :{
      type : String,
      required : true,
    },
    countryId :{
      type : mongoose.Schema.Types.ObjectId,
      ref : "adminsubDestination",
    },
    guide : {
      type : String,
      required : true,
    },
    guideId : {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'adminguide',
    },
    para : {
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
    image :{
      type : String,
      required : true,
    },
    status :{
      type : String,
      default : 1,
    }

}, {timestamps:true})

module.exports = mongoose.model('adminCities', adminCitiesSchema)
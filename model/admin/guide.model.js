const mongoose = require('mongoose')


const adminGuideSchema = new mongoose.Schema({

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
      country : {
        type : String,
        required : true,
      },
      countryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'adminDestination',
      },
      status :{
        type : String,
        default : 1,
      }

}, {timestamps:true})


module.exports = mongoose.model('adminguide', adminGuideSchema)
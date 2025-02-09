const mongoose = require('mongoose')

const adminBlogModel = new mongoose.Schema({

    image : {
      type : String,
      required : true,
    },
    dtd : {
      type : String,
      required : true,
    },    
    like : {
      type : String,
      required : true,
    },
    msg : {
      type : String,
      required : true,
    },
    author : {
      type : String,
      required : true,
    },
    trip_type : {
      type : String,
      required : true,
    },
    para : {
      type : String,
      required : true,
    },
    status : {
      type : String,
      default : 1
    },
    date : {
      type : Date,
      default : Date.now
    }
    
},{timestamps: true})


module.exports = mongoose.model('adminBlog' , adminBlogModel)
const adminBlogModel = require('../../model/admin/blog.model')
const path = require('path')
const fs = require('fs')


class ReadMoreAbout{

  aboutReadMore = async (req,res)=>{
    try {    
      res.render('user/readmoreAbout',{
        data : req.user      
      })
    } catch (error) {
      console.log(error);
    }
  }

  uerAuth = (req,res,next)=>{
    if(req.user){
      next()
    }else{
      res.redirect('/login')
    }
  }

}




module.exports = new ReadMoreAbout()
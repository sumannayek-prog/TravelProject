const adminBlogModel = require('../../model/admin/blog.model')
const path = require('path')
const fs = require('fs')


class ReadMoreBlogs{

  blogReadMore = async (req,res)=>{
    try {
    const id = req.params.id
    const blogData = await adminBlogModel.findById(id)
    if(blogData){    
      res.render('user/readmoreBlogs',{
        allBlogData : blogData,
        data : req.user      
      })
    }
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




module.exports = new ReadMoreBlogs()
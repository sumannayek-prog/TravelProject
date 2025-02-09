const adminBlogModel = require('../../model/admin/blog.model')
const path = require('path')
const fs = require('fs')

class AdminBlog{

  adminBlog = async (req,res)=>{
    const allBlogs = await adminBlogModel.find()
    res.render('admin/blog/blogs',{
      data : req.admin,
      allblogs : allBlogs,
      error_msg : req.flash('error_msg'),
      success_msg : req.flash('success_msg')
    })
  }

  adminAddBlog = (req,res)=>{
    res.render('admin/blog/addBlog',{
      data : req.admin
    })
  }

  admincreateBlog = async (req,res)=>{
    try {
      const {image,dtd,like,msg,author,trip_type,para} = req.body
      const newBlog = new adminBlogModel({
        image,dtd,like,msg,author,trip_type,para
      })
      if(req.file){
        newBlog.image = req.file.path
      }
      const allBlogs = await newBlog.save()
      if(allBlogs){
        req.flash('success_msg' , "Blog Created Successfully!!")
        res.redirect('/admin/blog')
      }
    } catch (error) {
      console.log(error);
    }
  }

  adminEditBlog = async (req,res)=>{
    const id = req.params.id
    const editBlog = await adminBlogModel.findById(id)
    if(editBlog){
      res.render('admin/blog/editBlog',{
        edit : editBlog,
        data : req.admin,
        error_msg : req.flash('error_msg'),
        success_msg : req.flash('success_msg')
      })
    }
  }

  adminUpdateBlog = async (req,res)=>{
    try {
      const id = req.params.id
      const newImage = req.file.path
      const duplicateImagedelete = await adminBlogModel.findById(id)
      fs.unlinkSync(duplicateImagedelete.image)    
        const updateblog = await adminBlogModel.findByIdAndUpdate(id,
          {image : newImage,
          dtd : req.body.dtd,
          like : req.body.like,
          msg : req.body.msg,
          author : req.body.author,
          trip_type : req.body.trip_type,
          para : req.body.para
        },
        {new:true})
        if(req.file){
          updateblog.image = req.file.path
        }
        if(updateblog){
          req.flash('success_msg' , 'Update Blog Successfully!!')
          res.redirect('/admin/blog')        
      }else{
        res.redirect('/admin/addBlog')
        req.flash("error_msg", "Something went wrong")
      }      
    } catch (error) {
      console.log(error);
    }
  }

  adminDeleteBlog = async (req,res)=>{
    try {
      const id = req.params.id
      const deleteBlog = await adminBlogModel.findByIdAndDelete(id)
      if(deleteBlog){
        fs.unlinkSync(deleteBlog.image)
        req.flash('success_msg' , 'Delete Blog SUccessfully!!')
        res.redirect('/admin/blog') 
      }
    } catch (error) {
      console.log(error);
    }   
  }

  activeBlog = async (req,res)=>{
    try {
      const id = req.params.id
      const active = await adminBlogModel.findById(id)
      if(active){
        const tempDell = await adminBlogModel.findByIdAndUpdate(req.params.id, {status : 0})
        if(tempDell){
          req.flash('error_msg' , 'Deacitave Successfully!!')
          res.redirect('/admin/blog')
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  deactiveBlog = async (req,res)=>{
    try {
      const id = req.params.id
      const deactive = await adminBlogModel.findById(id)
      if(deactive){
        const tempDell = await adminBlogModel.findByIdAndUpdate(req.params.id,{status:1})
        if(tempDell){
          req.flash('success_msg' , 'Active Successfully!!')
          res.redirect('/admin/blog')
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  adminAuth = (req,res,next)=>{
    if(req.admin){
      next()
    }else{
      res.redirect('/admin/login')
    }
      
  }

}

module.exports = new AdminBlog()
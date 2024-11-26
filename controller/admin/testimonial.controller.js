const adminTestimonialModel = require('../../model/admin/testimonial.model')
const path = require('path')
const fs = require('fs')

class AdminTestimonial{

  adminTestimonial = async (req,res)=>{
    const allTest = await adminTestimonialModel.find()
    res.render('admin/testimonial/testimonial',{
      data : req.admin,
      alltest: allTest,
      success_msg : req.flash('success_msg'),
      error_msg : req.flash('error_msg'),
    })
  }

  adminAddTestimonial = (req,res)=>{
    res.render('admin/testimonial/addtestimonial',{
      data : req.admin,
      success_msg : req.flash('success_msg'),
      error_msg : req.flash('error_msg'),
    })
  }

  adminCreateTestimonial = async(req,res)=>{
    try {
      const {para,image,title,sub_title} = req.body
      const newTest = await adminTestimonialModel({
        para,image,title,sub_title
      })
      if(req.file){
        newTest.image = req.file.path
      }
      const allTest = await newTest.save()
      if(allTest){
        req.flash('success_msg' , 'Successfully Testimonial Created')
        res.redirect('/admin/testimonial')
      }
    } catch (error) {
      console.log(error);
    }
  }

  adminShowTestimonial = async (req,res)=>{
    const allTest = await adminTestimonialModel.find()
    res.json({
      success: 1,
      message: "get all data",
      alltest: allTest
  })
  }

  adminDeleteTestimonial = async (req,res)=>{
    try {
      const id = req.params.id
      const deleteTest = await adminTestimonialModel.findByIdAndDelete(id)
      if(deleteTest){
        fs.unlinkSync(deleteTest.image)
        req.flash('success_msg' , 'Delete Blog SUccessfully!!')
        res.redirect('/admin/testimonial')
        res.json({ message: "delete Successfully" })
      }
    } catch (error) {
      console.log(error);
    }    
  }

  activetest = async (req,res)=>{
    try {
      const id = req.params.id
      const activetest = await adminTestimonialModel.findById(id)
      if(activetest){
      const tempdell = await adminTestimonialModel.findByIdAndUpdate(req.params.id,{status:0})
      if(tempdell){
      req.flash('success_msg', 'Deativate successfully!!'),
      res.json({ message: "Deactivate successfully" });
      }
    }
    } catch (error) {
      console.log(error);
    }  
  }

  deactivetest = async (req,res)=>{
    try {
      const id = req.params.id
      const deactivetest = await adminTestimonialModel.findById(id)
      if(deactivetest){
      const tempdell = await adminTestimonialModel.findByIdAndUpdate(req.params.id,{status:1})
      if(tempdell){
        req.flash('error_msg', 'Activate successfully!!'),
        res.json({ message: "Activate successfully" });
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

module.exports = new AdminTestimonial()
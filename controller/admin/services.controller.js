const adminServiceModel = require('../../model/admin/services.model')
const path = require('path')
const fs = require('fs')

class AdminService{

  adminService = async (req,res)=>{
    const allServiceData = await adminServiceModel.find()
    res.render('admin/services/service',{
      error_msg : req.flash('error_msg'),
      success_msg : req.flash('success_msg'),
      data : req.admin,
      allServicedata : allServiceData
    })
  }

  adminAddService = async (req,res)=>{
    res.render('admin/services/addService',{
      error_msg : req.flash('error_msg'),
      success_msg : req.flash('success_msg'),
      data : req.admin
    })
  }

  adminCreateService = async (req,res)=>{
    try {
      const {title,para,image} = req.body
      const newService = new adminServiceModel({
        title,para,image
      })
      if(req.file){
        newService.image = req.file.path
      }
      const allServiceData = await newService.save()
      if(allServiceData){
        req.flash('success_msg', "Service Created successfully")
        res.redirect('/admin/service')
      }
    } catch (error) {
      console.log(error);
    }
  }

  editService = async (req,res)=>{
    try {
      const id = req.params.id
      const editData = await adminServiceModel.findById(id)
      if(editData){
        res.render('admin/services/editService',{
          edit : editData,
          data : req.admin,
          error_msg : req.flash('error_msg'),
          success_msg : req.flash('success_msg'),
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  updateService = async (req,res)=>{
    try {
      const id = req.params.id
      const newImage = req.file.path
      const duplicateImageDelete = await adminServiceModel.findById(id)
      fs.unlinkSync(duplicateImageDelete.image)
      const updateService = await adminServiceModel.findByIdAndUpdate(id,{
        title: req.body.title,
        para:req.body.para,
        image: newImage
      },{new:true})
      if(updateService){
        req.flash('success_msg', 'Update Services successfully')
        res.redirect('/admin/service')
      }else{
        res.redirect('/admin/updateService')
        req.flash("error_msg", "Something went wrong")
      }
    } catch (error) {
      console.log(error);
    }
  }

  deleteService = async (req,res)=>{
    const id = req.params.id
    const deleteServices = await adminServiceModel.findByIdAndDelete(id)
    if(deleteServices){
      fs.unlinkSync(deleteServices.image)
      req.flash('success_msg', "Delete Services successfully")
      res.redirect('/admin/service')
    }
  }

  activeThumpsService = async (req,res)=>{
    try {    
      const id = req.params.id
      const match = await adminServiceModel.findById(id)
      if(match){
        const tempDell = await adminServiceModel.findByIdAndUpdate(req.params.id, {status : 0})
        if(tempDell){
          req.flash('error_msg' , "Deactive successfully")
          res.redirect('/admin/service')
    }else{
          res.redirect('/admin/service')
    }
      }    
    } catch (error) {
      console.log(error);
    }
  }

  deactiveThumpsService = async (req,res)=>{
    try {
      const id = req.params.id
      const matched = await adminServiceModel.findById(id)
      if(matched){
        const tempDell = await adminServiceModel.findByIdAndUpdate(req.params.id, {status : 1})
        if(tempDell){
          req.flash('success_msg' , "Active successfully")
          res.redirect('/admin/service')
    }else{
          res.redirect('/admin/service')
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

module.exports = new AdminService()
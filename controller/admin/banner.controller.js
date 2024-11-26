const adminBannerModel = require('../../model/admin/banner.model')
const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')


class AdminBanner{

  adminBanner = async (req,res)=>{
    const allBannerData = await adminBannerModel.find()
    res.render('admin/banner/bannerr',{
      error_msg : req.flash('error_msg'),
      success_msg : req.flash('success_msg'),
      data : req.admin,
      allBannerdata : allBannerData,
    })
  }

  adminAddBanner = async (req,res)=>{
    res.render('admin/banner/addBanner',{
      error_msg : req.flash('error_msg'),
      success_msg : req.flash('success_msg'),
      data : req.admin,
    })
  }

  adminCreateBanner = async (req,res)=>{
    try {
      const {sub_title,title,sub_head,image} = req.body
      const newBanner = new adminBannerModel({
        sub_title,title,sub_head,image
      })
      if(req.file){
        newBanner.image = req.file.path
      }
      const allBannerData = await newBanner.save()
      if(allBannerData){
          res.rendirect('/admin/bannerr')
          req.flash('success_msg' , "Banner Created successfully")
      }
    } catch (error) {
      console.log(error);
    }
  }

  editBanner = async (req,res)=>{
    try {
      const id = req.params.id
      const editData = await adminBannerModel.findById(id)
      if(editData){
        res.render('admin/banner/editBanner',{
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

  updateBanner = async(req,res)=>{
    try {
        const id = req.params.id
        const newImage = req.file.path
        const duplicateImagedelete= await adminBannerModel.findById(id)
          fs.unlinkSync(duplicateImagedelete.image)
        const updateBanner = await adminBannerModel.findByIdAndUpdate(id,
          { sub_title : req.body.sub_title,
            title : req.body.title, 
            sub_head : req.body.sub_head, 
            image : newImage 
          },
          {new : true})
        if(req.file){
          updateBanner.image = req.file.path
        }
        if(updateBanner){
          req.flash("success_msg","Banner update Successfully!!!")
          res.redirect('/admin/bannerr')

        }else{
          res.redirect('/admin/addBanner')
          req.flash("error_msg", "Something went wrong")
        }
    } catch (error) {
      console.log(error);
    }
  }

  deleteBanner = async (req,res)=>{
    const id = req.params.id
    try {
        const deleteBanner = await adminBannerModel.findByIdAndDelete(id)
        if(deleteBanner){
          fs.unlinkSync(deleteBanner.image)
          req.flash('success_msg', "Banner deleted successfully")
          res.redirect('/admin/bannerr')
        }
    } catch (error) {
      console.log(error);
    }
  }

  activeThumpsBanner = async (req,res)=>{
  try {    
    const id = req.params.id
    const match = await adminBannerModel.findById(id)
    if(match){
      const tempDell = await adminBannerModel.findByIdAndUpdate(req.params.id, {status : 0})
      if(tempDell){
        req.flash('error_msg' , "Deactive successfully")
        res.redirect('/admin/bannerr')
  }else{
        res.redirect('/admin/bannerr')
  }
    }    
  } catch (error) {
    console.log(error);
  }  
  }

  deactiveThumpsBanner = async (req,res)=>{
  try {
    const id = req.params.id
    const matched = await adminBannerModel.findById(id)
    if(matched){
      const tempDell = await adminBannerModel.findByIdAndUpdate(req.params.id, {status : 1})
      if(tempDell){
        req.flash('success_msg' , "Active successfully")
        res.redirect('/admin/bannerr')
  }else{
        res.redirect('/admin/bannerr')
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

module.exports = new AdminBanner()
const adminPackagesModel = require('../../model/admin/packages.model')
const adminGuideSchema = require('../../model/admin/guide.model')

const fs= require('fs')

class AdminPackages{

  adminPackages = async (req,res)=>{
    const allPackagesData = await adminPackagesModel.find()
    res.render('admin/packages/packages',{
      error_msg : req.flash('error_msg'),
      success_msg : req.flash('success_msg'),
      data : req.admin,
      allPackagesdata : allPackagesData
    })
  }

  adminAddPackages = async(req,res)=>{
    const allGuide = await adminGuideSchema.find()  
    res.render('admin/packages/addPackages',{
      error_msg : req.flash('error_msg'),
      success_msg : req.flash('success_msg'),
      data : req.admin,
      allguide: allGuide
    })
  }

  adminCreatePackages = async (req,res)=>{
    try {
      const {amount,image,location,days,person,title,hotel,para,guide,guideId} = req.body
      const newPackages = new adminPackagesModel({
        amount,image,location,days,person,title,hotel,para,guide,guideId
      })
      if(req.file){
        newPackages.image = req.file.path
      }
      const allPackagesData = await newPackages.save()
      if(allPackagesData){
        req.flash('error_msg', 'Packages Created successfully!!'),
        res.redirect('/admin/packages')
      }
    } catch (error) {
      console.log(error);
    }
  }

  editPackages = async (req,res)=>{
    const id = req.params.id
    const editData = await adminPackagesModel.findById(id)
    if(editData){
      res.render('admin/packages/editPackages',{
        edit : editData,
        data : req.admin,
        error_msg : req.flash('error_msg'),
        success_msg : req.flash('success_msg'),
      })
    }
  }

  updatePackages = async (req,res)=>{
    try {
      const id = req.params.id
      const newImage = req.file.path
      const duplicateImageDelete = await adminPackagesModel.findById(id)
      fs.unlinkSync(duplicateImageDelete.image)
      const updateData = await adminPackagesModel.findByIdAndUpdate(id,{
        amount : req.body.amount, 
        image : newImage,
        location : req.body.location,
        days : req.body.days,
        person : req.body.person,
        title : req.body.title,
        hotel : req.body.hotel,
        para : req.body.para,
      },{new:true})
      if(updateData){
        req.flash('success_msg', 'Update Packages successfully')
        res.redirect('/admin/packages')
      }else{
        req.flash("error_msg", "Something went wrong")
        res.redirect('/admin/editPackages')
      }
    } catch (error) {
      console.log(error);
    }
  }

  deletePackages = async (req,res)=>{
    const id = req.params.id
    const deleteData = await adminPackagesModel.findByIdAndDelete(id)
    if(deleteData){
      fs.unlinkSync(deleteData.image)
      req.flash('success_msg', 'Delete Packages successfully')
      res.redirect('/admin/packages')
    }
  }

  activePackages = async (req,res)=>{
    const id = req.params.id
    const deletepackages = await adminPackagesModel.findById(id)
    if(deletepackages){
      const tempDell = await adminPackagesModel.findByIdAndUpdate(req.params.id,{status: 0})
      if(tempDell){
        req.flash('error_msg' , "Deactive successfully")        
        res.redirect('/admin/packages')
      }
    }
  }

  deactivePackages = async (req,res)=>{
    const id = req.params.id
    const deletepackages = await adminPackagesModel.findById(id)
    if(deletepackages){
      const tempDell = await adminPackagesModel.findByIdAndUpdate(req.params.id,{status:1})
      if(tempDell){
        req.flash('success_msg' , 'Active successfully')
        res.redirect('/admin/packages')
      }
    }
  }


  adminAuth = (req,res,next)=>{
    if(req.admin){
      next()
    }else{
      res.redirect('/admin/login')
      next()
    }
  }

}

module.exports = new AdminPackages()
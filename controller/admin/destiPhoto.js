const adminDestiPhotoModel = require('../../model/admin/destination_sub.model')
const adminDestinationModel = require('../../model/admin/destination.model')
const adminGuideSchema = require('../../model/admin/guide.model')

const fs = require('fs')
const path = require('path')

class AdminDestinationPhoto{

    Destiphoto = async (req,res)=>{
      const allDestph = await adminDestiPhotoModel.find()
      const allDestinations = await adminDestinationModel.find()
      res.render('admin/destphoto/destiphoto',{
      error_msg : req.flash('error_msg'),
      success_msg : req.flash('success_msg'),
      data : req.admin,
      alldestph  : allDestph,
      alldestinations  : allDestinations 
    })
    }

    addDestiphoto = async (req,res)=>{
      const allDestinations = await adminDestinationModel.find()
      const allGuide = await adminGuideSchema.find()
        res.render('admin/destphoto/adddestphoto',{
        error_msg : req.flash('error_msg'),
        success_msg : req.flash('success_msg'),
        data : req.admin,
        alldestinations  : allDestinations,
        allguide: allGuide 
      })
    }

    createDestiphoto = async (req,res)=>{
      try {
        const {city,image,country,countryId} = req.body
        const files = req.files.map(file=>file.path)
        const newDestipht = new adminDestiPhotoModel({
          city, image : files, country, countryId
        })
        const allDestph = await newDestipht.save()
        if(allDestph){
          req.flash('success_msg' , 'All photos uploads!!')
          res.redirect('/admin/destiphoto')
        }
      } catch (error) {
        console.log(error);
      }
    }

    deleteDestiphoto = async (req,res)=>{
      try {
        const id = req.params.id
        const deleteDest = await adminDestiPhotoModel.findByIdAndDelete(id)
        if(deleteDest){  
          for(let img of deleteDest.image)
            fs.unlinkSync(img)        
            req.flash('success_msg' , 'All photos Deleted!!')
            res.redirect('/admin/destiphoto')
        }
      } catch (error) {
        console.log(error);
      }
    }
    
    activeDestiphoto = async (req,res)=>{
      const id = req.params.id
      const actv = await adminDestiPhotoModel.findById(id)
      if(actv){
        const tempDell = await adminDestiPhotoModel.findByIdAndUpdate(req.params.id,{status:0})
        if(tempDell){
          req.flash('error_msg' , 'Deactive Successfully!!')
          res.redirect('/admin/destiphoto')
        }
      }
    }

    deactiveDestiphoto = async (req,res)=>{
      const id = req.params.id
      const dactv = await adminDestiPhotoModel.findById(id)
      if(dactv){
        const tempDell = await adminDestiPhotoModel.findByIdAndUpdate(req.params.id,{status:1})
        if(tempDell){
          req.flash('success_msg' , 'Active Successfully!!')
          res.redirect('/admin/destiphoto')
        }
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

module.exports = new AdminDestinationPhoto()
const adminGuideSchema = require('../../model/admin/guide.model')
const adminDestinationModel = require('../../model/admin/destination.model')

const path = require('path')
const fs = require('fs')

class AdminGuide{

  adminGuide = async (req,res)=>{
    const allGuide = await adminGuideSchema.find() 
    res.render('admin/guide/guide',{
      data : req.admin,
      allguide: allGuide
    })
  }

  adminAddGuide = async (req,res)=>{
    const allDestinations = await adminDestinationModel.find()    
    res.render('admin/guide/addguide',{
      data : req.admin,
      alldestinations  : allDestinations 
    })
  }

  adminCreateGuide = async (req,res)=>{
    try {
      const {image,title,sub_title,country,countryId} = req.body
      const newGuide = new adminGuideSchema({
          image,title,sub_title,country,countryId
      })
      if(req.file){
        newGuide.image = req.file.path
      }
      const allGuide = await newGuide.save()
      if(allGuide){
        res.redirect('/admin/guide')
      }
    } catch (error) {
      console.log(error);
    }
  }

  adminShowGuide = async(req,res)=>{
    try {
      const allGuide = await adminGuideSchema.find()    
      res.json({success: 1, message: "get all data", allguide: allGuide })
    } catch (error) {
      console.log(error);
    }    
  }

  activeGuide = async (req,res)=>{
    try {
      const id = req.params.id
      const activeguide = await adminGuideSchema.findById(id)
      if(activeguide){
      const tempdell = await adminGuideSchema.findByIdAndUpdate(req.params.id,{status:0})
      if(tempdell){
      req.flash('success_msg', 'Deativate successfully!!'),
      res.json({ message: "Deactivate successfully" });
      }
    }
    } catch (error) {
      console.log(error);
    }  
  }

  deactiveGuide = async (req,res)=>{
    try {
      const id = req.params.id
      const deactiveguide = await adminGuideSchema.findById(id)
      if(deactiveguide){
      const tempdell = await adminGuideSchema.findByIdAndUpdate(req.params.id,{status:1})
      if(tempdell){
        req.flash('error_msg', 'Activate successfully!!'),
        res.json({ message: "Activate successfully" });
      }
    }
    } catch (error) {
      console.log(error);
    }
  }

  adminDeleteGuide = async (req,res)=>{
    try {
      const id = req.params.id
      const deleteGuide = await adminGuideSchema.findByIdAndDelete(id)
      if(deleteGuide){
        fs.unlinkSync(deleteGuide.image)
        res.json({ message: "delete Successfully" })
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
      next()
    }
  }

}

module.exports = new AdminGuide()
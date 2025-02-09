const adminDestinationModel = require('../../model/admin/destination.model')
const fs = require('fs')
const path = require('path')

class AdminDestination{

    adminDestination = async (req,res)=>{
    const allDestinations = await adminDestinationModel.find()
    res.render('admin/destination/destinations',{
      error_msg : req.flash('error_msg'),
      success_msg : req.flash('success_msg'),
      data : req.admin,
      alldestinations  : allDestinations 
    })
    }

    adminAddDestination = (req,res)=>{
    res.render('admin/destination/addDestination',{
      error_msg : req.flash('error_msg'),
      success_msg : req.flash('success_msg'),
      data : req.admin
    })
    }

    adminCreateDestination = async (req,res)=>{
    try {
      const {destination,image,country} = req.body
      const newDest = new adminDestinationModel({
        destination,image,country
      })
      if(req.file){
        newDest.image = req.file.path
      }
      const allDestinations = await newDest.save()
      if(allDestinations){
        req.flash('success_msg' , 'Successfully Created!!')
        res.redirect('/admin/destinations')
      }
    } catch (error) {
      console.log(error);
    }
    }

    adminUpdateDestination = async (req,res)=>{
    try {
      const id = req.params.id
      const newImage = req.file.path
      const duplicateImage = await adminDestinationModel.findById(id)
      fs.unlinkSync(duplicateImage.image)
      const update = await adminDestinationModel.findByIdAndUpdate(id,{
        destination: req.body.destination,
        image : newImage,
        country : req.body.country
      },{new:true})
      if(update){
        req.flash('success_msg' , 'Successfully Updated!!')
        res.redirect('/admin/destinations')
      }
    } catch (error) {
      console.log(error);
    }
    }

    adminEditDestination = async (req,res)=>{
    const id = req.params.id
    const editData = await adminDestinationModel.findById(id)
    if(editData){
      res.render('admin/destination/editDestination',{
        data : req.admin,
        edit : editData
      })
    }
    }

    adminDeleteDestination = async (req,res)=>{
    const id = req.params.id
    const deleteDest = await adminDestinationModel.findByIdAndDelete(id)
    fs.unlinkSync(deleteDest.image)
    if(deleteDest){
      req.flash('success_msg' , 'Successfully Deleted!!')
      res.redirect('/admin/destinations')        
      }
    }

    adminDeactiveDestination = async (req,res)=>{
      try {
        const id = req.params.id
        const deactive = await adminDestinationModel.findById(id)
        if(deactive){
          const tempDell = await adminDestinationModel.findByIdAndUpdate(req.params.id,{status:1})
          if(tempDell){
            req.flash('success_msg' , 'Active successfully!!')
            res.redirect('/admin/destinations')  
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    adminActiveDestination = async (req,res)=>{
      try {
        const id = req.params.id
        const active = await adminDestinationModel.findById(id)
        if(active){
          const tempDell = await adminDestinationModel.findByIdAndUpdate(req.params.id,{status:0})
          if(tempDell){
            req.flash('error_msg' , 'Deactive successfully!!')
            res.redirect('/admin/destinations')
          }
        }
      } catch (error) {
        console.log();
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



module.exports = new AdminDestination()
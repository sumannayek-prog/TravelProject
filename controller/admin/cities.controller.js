const adminCitiesModel = require('../../model/admin/cities.model')
const adminGuideSchema = require('../../model/admin/guide.model')
const adminDestinationModel = require('../../model/admin/destination.model')
const fs = require('fs')
const path = require('path')


class AdminCities{

  adminCitiesGet = async (req,res)=>{
    const allCities = await adminCitiesModel.find()
    res.render('admin/cities/cities',{
      data : req.admin,
      success_msg : req.flash('success_msg'),
      error_msg : req.flash('error_msg'),
      allcities : allCities
    })
  }

  adminaddCities = async (req,res)=>{
    const allCities = await adminCitiesModel.find()
    const allDestinations = await adminDestinationModel.find()
    const allGuide = await adminGuideSchema.find() 
    res.render('admin/cities/addcities',{
      data : req.admin,
      success_msg : req.flash('success_msg'),
      error_msg : req.flash('error_msg'),
      allcities : allCities,
      alldestinations  : allDestinations,
      allguide: allGuide
    })
  }

  createcities = async (req,res)=>{
    try {
      const {city,country,countryId,guide,guideId,para,hotel,days,adult,kid,amount,food,image} = req.body
      const newCity = new adminCitiesModel({
        city,country,countryId,guide,guideId,para,hotel,days,adult,kid,amount,food,image
      })
      if(req.file){
        newCity.image = req.file.path
      }
      const allCity = await newCity.save()
      if(allCity){
        res.redirect('/admin/cities')
        req.flash('success_msg' , 'Successfuly added!!')
      }
    } catch (error) {
      console.log(error);
    }
  }

  adminShowCities = async (req,res)=>{
    const allCities = await adminCitiesModel.find()
    res.json({
      success: 1,
      message: "get all data",
      allcities : allCities
  })
  }

  adminDeleteCities = async (req,res)=>{
    try {
      const id = req.params.id
      const deleteCity = await adminCitiesModel.findByIdAndDelete(id)
      if(deleteCity){
        fs.unlinkSync(deleteCity.image)
        res.redirect('/admin/cities')
        req.flash('success_msg' , 'Delete SUccessfully!!')
        res.json({ message: "delete Successfully" })
      }
    } catch (error) {
      console.log(error);
    }
  }

  adminActiveCities = async (req,res)=>{
    const id = req.params.id
    const actv = await adminCitiesModel.findById(id)
    if(actv){
      const tempdell = await adminCitiesModel.findByIdAndUpdate(req.params.id,{status:0})
      if(tempdell){
        res.json({message : 'deactive'})
      }
    }
  }

  adminDeactiveCities = async (req,res)=>{
    try {
      const id = req.params.id
      const deactv = await adminCitiesModel.findById(id)
      if(deactv){
        const tempdell = await adminCitiesModel.findByIdAndUpdate(req.params.id,{status:1})
        if(tempdell){
          res.json({message : 'active'})
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


module.exports = new AdminCities()
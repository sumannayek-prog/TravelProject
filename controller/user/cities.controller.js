const adminCitiesModel = require('../../model/admin/cities.model')
const userBookingModel = require('../../model/user/user.booking')

const fs = require('fs')
const path = require('path')


class citiesPageController{

  citiesPage = async (req,res)=>{
    const allCities = await adminCitiesModel.find()
    res.render('user/cities',{
        data : req.user,
        error_msg : req.flash('error_msg'),
        success_msg : req.flash('success_msg'),
        allcities : allCities
      })
  }

  citiesPageUsa = async (req,res)=>{
    try {
      const allData = await adminCitiesModel.aggregate([
        {$project:{_v:0}}, {$sort:{_id: 1}}, {$match:{country : "USA"}},
        
        {        
          $lookup: {
              from: "admindestinations", // category
              localField: "countryId",
              foreignField: "_id",
              as: "Guide Details",              
          }
      },
      
      ]) 
      // return res.json({allData})
        res.render('user/cities',{
        alldata : allData,
        data : req.user
      })
      
    } catch (error) {
      console.log(error);
    }
  }

  citiesPageCan = async (req,res)=>{
    try {
      const allData = await adminCitiesModel.aggregate([
        {$project:{_v:0}}, {$sort:{_id: 1}}, {$match:{country : "Canada"}},
        
        {        
          $lookup: {
              from: "admindestinations", // category
              localField: "countryId",
              foreignField: "_id",
              as: "Guide Details",              
          }
      },
      
      ]) 
      // return res.json({allData})
        res.render('user/cities',{
        alldata : allData,
        data : req.user
      })
      
    } catch (error) {
      console.log(error);
    }
  }

  citiesPageEur = async (req,res)=>{
    try {
      const allData = await adminCitiesModel.aggregate([
        {$project:{_v:0}}, {$sort:{_id: 1}}, {$match:{country : "Europe"}},
        
        {        
          $lookup: {
              from: "admindestinations", // category
              localField: "countryId",
              foreignField: "_id",
              as: "Guide Details",              
          }
      },
      
      ]) 
      // return res.json({allData})
        res.render('user/cities',{
        alldata : allData,
        data : req.user
      })
      
    } catch (error) {
      console.log(error);
    }
  }

  citiesPageChi = async (req,res)=>{
    try {
      const allData = await adminCitiesModel.aggregate([
        {$project:{_v:0}}, {$sort:{_id: 1}}, {$match:{country : "China"}},
        
        {        
          $lookup: {
              from: "admindestinations", // category
              localField: "countryId",
              foreignField: "_id",
              as: "Guide Details",              
          }
      },
      
      ]) 
      // return res.json({allData})
        res.render('user/cities',{
        alldata : allData,
        data : req.user
      })
      
    } catch (error) {
      console.log(error);
    }
  }

  citiesPageSingp = async (req,res)=>{
    try {
      const allData = await adminCitiesModel.aggregate([
        {$project:{_v:0}}, {$sort:{_id: 1}}, {$match:{country : "Singapore"}},
        
        {        
          $lookup: {
              from: "admindestinations", // category
              localField: "countryId",
              foreignField: "_id",
              as: "Guide Details",              
          }
      },
      
      ]) 
      // return res.json({allData})
        res.render('user/cities',{
        alldata : allData,
        data : req.user
      })
      
    } catch (error) {
      console.log(error);
    }
  }


  citiesConfirmBook = async (req,res)=>{
    try {
      const id = req.params.id
      const allData = await adminCitiesModel.findById(id)
      if(allData){
        res.render('user/confirmbook',{
          alldata : allData,
          data : req.user
        })
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  citiesConfirmBookpost = async (req,res)=>{
    try {
      const {name,email,city,country,guide,hotel,days,adult,kid,amount,food,coupon} = req.body
      const newCity = new userBookingModel({
        name,email,city,country,guide,hotel,days,adult,kid,amount,food,coupon
      })
      const allCity = await newCity.save()
      if(allCity){
        res.redirect('/dashboard')
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


module.exports = new citiesPageController()
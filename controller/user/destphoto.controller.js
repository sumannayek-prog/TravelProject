const adminDestinationModel = require('../../model/admin/destination.model')

const adminDestiPhotoModel = require('../../model/admin/destination_sub.model')



class DestPhoto{

  getDestPhotosUSA = async (req,res)=>{
    try {
      const allData = await adminDestiPhotoModel.aggregate([
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
        res.render('user/viewDestPhoto',{
        alldata : allData,
        data : req.user
      })
      // for (let i = 0; i<allData.length; i++){
      //   if (allData[i]){
      //     console.log (allData[i].city + " " + allData[i].country);
      //   }
      // }
      
    } catch (error) {
      console.log(error);
    }
  }

  getDestPhotosCAN = async (req,res)=>{
    try {
      const allData = await adminDestiPhotoModel.aggregate([
        {$project:{_v:0}}, {$sort:{_id: 1}}, {$match:{country : "Canada"}},
        
        {        
          $lookup: {
              from: "admindestinations", // sub-category
              localField: "countryId",
              foreignField: "_id",
              as: "Guide Details",              
          }
      },
      
      ]) 
      // return res.json({allData})
        res.render('user/viewDestPhoto',{
        alldata : allData,
        data : req.user
      })
      // for (let i = 0; i<allData.length; i++){
      //   if (allData[i]){
      //     console.log (allData[i].city + " " + allData[i].country);
      //   }
      // }
      
    } catch (error) {
      console.log(error);
    }
  }

  getDestPhotosCHINA = async (req,res)=>{
    try {
      const allData = await adminDestiPhotoModel.aggregate([
        {$project:{_v:0}}, {$sort:{_id: 1}}, {$match:{country : "China"}},
        
        {        
          $lookup: {
              from: "admindestinations", // sub-category
              localField: "countryId",
              foreignField: "_id",
              as: "Guide Details",              
          }
      },
      
      ]) 
      // return res.json({allData})
        res.render('user/viewDestPhoto',{
        alldata : allData,
        data : req.user
      })
      // for (let i = 0; i<allData.length; i++){
      //   if (allData[i]){
      //     console.log (allData[i].city + " " + allData[i].country);
      //   }
      // }
      
    } catch (error) {
      console.log(error);
    }
  }

  getDestPhotosSING = async (req,res)=>{
    try {
      const allData = await adminDestiPhotoModel.aggregate([
        {$project:{_v:0}}, {$sort:{_id: 1}}, {$match:{country : "Singapore"}},
        
        {        
          $lookup: {
              from: "admindestinations", // sub-category
              localField: "countryId",
              foreignField: "_id",
              as: "Guide Details",              
          }
      },
      
      ]) 
      // return res.json({allData})
        res.render('user/viewDestPhoto',{
        alldata : allData,
        data : req.user
      })
      // for (let i = 0; i<allData.length; i++){
      //   if (allData[i]){
      //     console.log (allData[i].city + " " + allData[i].country);
      //   }
      // }
      
    } catch (error) {
      console.log(error);
    }
  }

  getDestPhotosEUO = async (req,res)=>{
    try {
      const allData = await adminDestiPhotoModel.aggregate([
        {$project:{_v:0}}, {$sort:{_id: 1}}, {$match:{country : "Europe"}},
        
        {        
          $lookup: {
              from: "admindestinations", // sub-category
              localField: "countryId",
              foreignField: "_id",
              as: "Guide Details",              
          }
      },
      
      ]) 
      // return res.json({allData})
        res.render('user/viewDestPhoto',{
        alldata : allData,
        data : req.user
      })
      // for (let i = 0; i<allData.length; i++){
      //   if (allData[i]){
      //     console.log (allData[i].city + " " + allData[i].country);
      //   }
      // }
      
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

module.exports = new DestPhoto()
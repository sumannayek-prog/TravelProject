const adminPackagesModel = require('../../model/admin/packages.model')
const adminCitiesModel = require('../../model/admin/cities.model')


class ReadMorePackages{

  packagesReadMore = async (req,res)=>{
    try {
    const id = req.params.id
    const packageData = await adminPackagesModel.findById(id)
    const allCities = await adminCitiesModel.find()
    if(packageData){    
      res.render('user/readmorePackages',{
        allPackageData : packageData,
        data : req.user ,
        allcities : allCities     
      })
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




module.exports = new ReadMorePackages()
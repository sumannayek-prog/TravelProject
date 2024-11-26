const userBookingModel = require('../../model/user/user.booking')


class AdminBooking{

  adminbookingPage = async (req,res)=>{
    const allBookingData = await userBookingModel.find()
      res.render('admin/booking/booking',{
        error_msg : req.flash('error_msg'),
        success_msg : req.flash('success_msg'),
        data : req.admin,
        allBookingdata : allBookingData
      })
  }

  deletebooking = async (req,res)=>{
    const id = req.params.id
    const deleteBooking = await userBookingModel.findByIdAndDelete(id)
    if(deleteBooking){
      req.flash('success_msg', 'Successfully deleted'),
      res.redirect('/admin/booking')        
    }
  }

  activebooking = async (req,res)=>{
    try {
      const id = req.params.id
      const activeBook = await userBookingModel.findById(id)
      if(activeBook){
      const tempdell = await userBookingModel.findByIdAndUpdate(req.params.id,{status:0})
      if(tempdell){
      req.flash('success_msg', 'Deactivate successfully!!'),
      res.redirect('/admin/booking')
      }
    }
    } catch (error) {
      console.log(error);
    }
    
  }

  deactivebooking = async (req,res)=>{
    try {
      const id = req.params.id
      const deactiveBook = await userBookingModel.findById(id)
      if(deactiveBook){
      const tempdell = await userBookingModel.findByIdAndUpdate(req.params.id,{status:1})
      if(tempdell){
        req.flash('error_msg', 'Deactivate successfully!!'),
        res.redirect('/admin/booking')
      }
    }
    } catch (error) {
      console.log(error);
    }    
  }

  // adminbookingPage = async(req,res)=>{
  //   try {
  //     const data = await userBookingModel.aggregate([
  //       {$project : {_v : 0}}        
  //     ])    
  //     let option = {
  //       page : 1,
  //       limit : 2
  //     }
  //     let allBookingData = await userBookingModel.aggregatePaginate(data,option)
  //     console.log('pg' , allBookingData);
  //     if(allBookingData)
  //       {res.render('admin/booking/booking',{
  //       error_msg : req.flash('error_msg'),
  //       success_msg : req.flash('success_msg'),
  //       data : req.admin,
  //       allBookingdata : allBookingData
  //     })}
      
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  adminAuth = (req,res,next)=>{
    if(req.admin){
      next()
    }else{
      res.redirect('/admin/login')
    }
      
  }

}

module.exports = new AdminBooking()
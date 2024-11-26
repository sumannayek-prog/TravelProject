const userContactModel = require('../../model/user/user.contact')

class AdminContact{

  adminContactPage = async (req,res)=>{
    const allcontact = await userContactModel.find()
    res.render('admin/contact/contact',{
      data : req.admin,
      allContact : allcontact
    })
  }

  adminShowPage = async (req,res)=>{
    try {
      const allcontact = await userContactModel.find()
      res.json({
        success: 1,
        message: "get all data",
        allContact: allcontact
    })
    } catch (error) {
      console.log(error);
    }
  }

  adminDeletePage = async (req, res) => {
    try {
        let id = req.params.id;
        await userContactModel.findByIdAndDelete(id);
        res.json({ message: "Delete Successfully" });

    } catch (error) {
        console.log(error);
    }   
  }

  adminActivePage = async (req,res)=>{
  try {
    const id = req.params.id
    const activeBook = await userContactModel.findById(id)
    if(activeBook){
    const tempdell = await userContactModel.findByIdAndUpdate(req.params.id,{status:0})
    if(tempdell){
    req.flash('success_msg', 'Activate successfully!!'),
    res.json({ message: "Activate successfully" });
    }
  }
  } catch (error) {
    console.log(error);
  }
  }

  adminDeactivePage = async (req,res)=>{
  try {
    const id = req.params.id
    const deactiveBook = await userContactModel.findById(id)
    if(deactiveBook){
    const tempdell = await userContactModel.findByIdAndUpdate(req.params.id,{status:1})
    if(tempdell){
      req.flash('error_msg', 'Deactivate successfully!!'),
      res.json({ message: "Dectivate successfully" });
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

module.exports = new AdminContact()
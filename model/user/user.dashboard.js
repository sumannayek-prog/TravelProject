const mongoose = require('mongoose')

const userDashboardSchema = new mongoose.Schema({

    

},{timestamps:true})

module.exports = mongoose.model('userdashboard' , userDashboardSchema)
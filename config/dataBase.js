const mongoose = require('mongoose')

const connectDB = async ()=>{
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log(`MongoDB connect successfully!!`);
  } catch (error) {
    console.log(`Error in MongoDB connection : `+error);
  }
}

module.exports = connectDB
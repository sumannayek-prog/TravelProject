const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenadminSchema = new Schema({
    _userId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'admin',
    },
    token:{
        type:String,
        required:true
    },
    expiredAt:{
        type:Date,
        default:Date.now,
        index:{
            expires:86400000
        }
    }
})

const tokenModels = new mongoose.model("tokenadmin",tokenadminSchema);
module.exports =tokenModels;

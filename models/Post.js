const mongoose=require('mongoose')

const Postschema= new mongoose.Schema({
    owner:{
     type:mongoose.Types.ObjectId,
     ref:"user"
    },
    title:String,
    discription:String,
    created_at:{
        type:Date,
        default:Date.now
    },
    
});
module.exports=mongoose.model("post",Postschema);
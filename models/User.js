const mongoose=require('mongoose')

const UserSchema= new mongoose.Schema({
    firstname:String,
    lastname:String,
    phone:Number,
    email:String,
    password:String,
   
  
  });
module.exports=mongoose.model('user',UserSchema);


//------------------------------------------------------


exports.createUser = (userData) => {
  const user = new User(userData);
  return user.save().catch((e) => console.log(e.message));
};
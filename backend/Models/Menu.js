const mongoose=require('mongoose');

const menuSchema=new mongoose.Schema({
    name:{type:String,required:true},
    description:String
});

module.exports=mongoose.model("Menu",menuSchema);
const mongoose=require("mongoose");

const menuItemSchema=new mongoose.Schema({
    menuId:{type:mongoose.Schema.Types.ObjectId,ref:'Menu',required:true},
    name:{type:String,required:true},
    description:String,
    price:{type:String,required:true}
});

module.exports=mongoose.model("MenuItem",menuItemSchema);
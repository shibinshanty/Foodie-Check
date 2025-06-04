const mongoose=require('mongoose');

const ConnectDB=async ()=>{
    try {
        await mongoose.connect(process.env.Mongo_Url);
        console.log("MongoDB is Connected");
    } catch (error) {
        console.error("MongoDB is not Connected",error)
    }
}


module.exports=ConnectDB;
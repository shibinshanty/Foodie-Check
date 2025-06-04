
require('dotenv').config()
const express=require('express');
const app=express();
const cors=require('cors');
const ConnectDB=require('./config')
const PORT=process.env.PORT||3004
const userRoute=require('./Routes/userRoute')
const menuRoute=require('./Routes/menuRoute')
app.use(cors());
app.use(express.json());

//connect to mongodb
ConnectDB();

//Test Route

app.get('/',(req,res)=>{
   res.send("It Is Working")
})

//user route
app.use('/user',userRoute);

//menuroutes
app.use('/',menuRoute);

//server connection

app.listen(PORT,()=>{console.log(`Server is connected on  PORT ${PORT}`)})
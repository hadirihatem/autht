const express=require('express') 

const connectDB=require('./helpers/connectDB')

const app=express()

//connect to db 
connectDB();

//middlewares
app.use(express.json());

 //define Routes   
app.use("/api", require('./routes/register'))
app.use('/login',require('./routes/login'))
app.use('/post',require('./routes/Post'))


const port =process.env.port || 5001 ;
app.listen(port,()=> console.log(`server is runing on port :${port}`))
const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const dotenv=require("dotenv")
const expenseRoute=require("./routes/expense")


dotenv.config()
const app=express();



//middleware
app.use(cors());
app.use(express.json())

//Routes
app.use("/expenses",expenseRoute);



//DB connection

mongoose.connect(process.env.DB_CONNECTION).then(()=>{
    console.log("DataBase is Connection is Established Successfully");
}).catch((err)=>{
    console.log("not established");
})

app.listen(process.env.PORT,()=>{
    console.log(`Backend Server is running on port ${process.env.PORT}`)
})
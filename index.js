const express=require("express")
const dotenv=require("dotenv")
const {mongoose}=require("mongoose")
const router=require("./Routes/animalRoutes")
const app= express()
dotenv.config()
app.use(express.json())
const mongo_url=process.env.MONGO_URL
console.log(mongo_url)
const connectDB= async () => {
    try{
        const connect=await mongoose.connect(mongo_url,{
           
            dbName: 'animalCollection'
        })
        console.log("db connected")
    }
    catch(err){
        console.log("db not connected",err.message)
    }
   
};
connectDB()

app.use("/api",router)

app.listen(process.env.PORT,()=>{
    console.log("app is running on 5000")
}
)
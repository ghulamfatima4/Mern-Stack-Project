import mongoose from "mongoose";
import 'dotenv'
const connectDB = async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/AuraMart")
        console.log("db connected successfully")
        
    } catch (error) {
        console.log("Mongodb is not connected", error)
    }
}


export default connectDB;



